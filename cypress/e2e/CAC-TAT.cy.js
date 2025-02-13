/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT',() =>{

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(() =>{

        cy.visit('./src/index.html')

    })    

    it('Verificar o titulo da aplicação',() =>{

        cy.title().should('eq','Central de Atendimento ao Cliente TAT')

    })

    Cypress._.times(3, () =>{
        it('Preencher os campos obrigatorios e enviar o formulário',()=>{
    
            const text = Cypress._.repeat('TESTE ', 20)
            
            cy.clock()
    
            cy.get('#firstName').type('Alisson', {delay:0})
            cy.get('#lastName').type('Carvalho', {delay:0})
            cy.get('#email').type('alisson@teste.com', {delay:0})
    
            cy.get('#open-text-area').invoke('val', text).should('have.value', text)
    
            cy.contains('button','Enviar').click()
    
            cy.get('.success').should('be.visible')
    
            cy.tick(THREE_SECONDS_IN_MS)
    
            cy.get('.success').should('not.be.visible')
    
        })

    })
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação invalida',()=>{

        cy.clock()

        cy.get('#firstName').type('Alisson', {delay:0})
        cy.get('#lastName').type('Carvalho', {delay:0})
        cy.get('#email').type('alisson2teste.com', {delay:0})

        cy.get('#open-text-area').type('Realização de teste', {delay:0})

        cy.contains('button','Enviar').click({force: true})

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')


    })

    it('Campo "Telefone" com valores não numéricos deve ficar vazio',() =>{

        cy.get('#phone').type('aaa').should('have.value','')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{

        cy.clock()

        cy.get('#firstName').type('Alisson', {delay:0})
        cy.get('#lastName').type('Carvalho', {delay:0})
        cy.get('#email').type('alisson@teste.com', {delay:0})

        cy.get('#phone-checkbox').check()

        cy.get('.phone-label-span').should('be.visible')

        cy.get('#open-text-area').type('Realização de teste', {delay:0})

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')


    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',()=>{

        cy.get('#firstName').type('Alisson', {delay:0}).should('have.value', 'Alisson').clear().should('have.value', '')
        cy.get('#lastName').type('Carvalho', {delay:0}).should('have.value', 'Carvalho').clear().should('have.value', '')
        cy.get('#email').type('alisson@teste.com', {delay:0}).should('have.value', 'alisson@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('11940028922',{delay:0}).should('have.value','11940028922').clear().should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',()=>{

        cy.clock()

        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado',()=>{

        cy.clock()

        cy.fillMandatoryFieldsAndSubmit('Alisson','Carvalho','alisson@teste.com','Realização de teste')

        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto',() =>{

        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu texto',() =>{

        cy.get('#product').select('Mentoria').should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu texto',() =>{

        cy.get('#product').select('Blog').should('have.value', 'blog')

    })

    it('Marca o tipo de atendimento "Feedback"',() =>{

        cy.get('[type="radio"]').check('feedback').should('be.checked')

    })

    it('marca cada tipo de atendimento',() =>{

        cy.get('[type="radio"]').should('have.length', 3).each(($radio)=>{

            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        })
    })

    
    it('marca ambos checkboxes, depois desmarca o último', () =>{


        cy.get('input[type="checkbox"]').should('have.length', 2).check().last().uncheck().should('not.be.checked')

    })


    it('seleciona um arquivo da pasta fixtures',() =>{
       
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .should((input) => {
            expect(input[0].files[0].name).to.equal('example.json')
        
        
        } )

    })

    it('seleciona um arquivo simulando um drag-and-drop',() =>{

            cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should((input) =>{
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',() =>{
        
        cy.fixture('example.json').as('exampleFile')
        cy.get('input[type="file"]')
            .selectFile('@exampleFile') //o @ identifica que está sendo passado um alias
            .should((input) =>{
                expect(input[0].files[0].name).to.equal('example.json')
            })


    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',() =>{

        cy.contains('a', 'Política de Privacidade').should('have.attr', 'target','_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link',() =>{

        cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()

    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('faz uma requisição HTTP',() =>{


        cy.request({
            method:'GET',
            url:'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).include('CAC TAT')
        })

      })

      it.only('Encontra o gato escondido',() =>{

        cy.get('span#cat').invoke('show').should('be.visible')

      })


})