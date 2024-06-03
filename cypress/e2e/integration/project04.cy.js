import TodoPage from '../../../pages/TodoPage';

describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/project-6');
  });

  it('Test Case 01 - Todo-App Modal Verification', () => {
    TodoPage.todoModalTitle.should('be.visible').and('contain.text', 'My Tasks');
    TodoPage.newTodoInput.should('be.visible').and('be.enabled');
    TodoPage.addButton.should('be.visible').and('be.enabled');
    TodoPage.searchField.should('be.visible').and('be.enabled');
    TodoPage.emptyTaskMessage.should('be.visible').and('contain.text', 'No tasks found!');
  });


  it('Test Case 02 - Single Task Addition and Removal', () => {
    const newTask = 'do shopping for food';
    TodoPage.newTodoInput.type(newTask);
    TodoPage.addButton.click();
    TodoPage.todoItems.should('contain.text', newTask);
    TodoPage.todoItems.should('have.length', 1);
    TodoPage.todoItems.first().click();
    TodoPage.completedTodoItem.should('exist');
    TodoPage.removeButton.should('be.visible').click();
    TodoPage.emptyTaskMessage.should('be.visible').and('contain.text', 'No tasks found!');

  });

  
  it('Test Case 03 - Multiple Task Operations', () => {
    const tasks = ['buy groceries', 'clean house', 'wash clothes', 'visit doctor', 'finish reading book'];
    
    tasks.forEach(task => {
        TodoPage.newTodoInput.clear().type(task);
        TodoPage.addButton.click();
        cy.wait(500); 
        TodoPage.todoItems.should('contain.text', task);
    });

    TodoPage.todoItems.should('have.length', 5);
    TodoPage.todoItems.each(($el) => {
        cy.wrap($el).click();
    });

    TodoPage.removeButton.then($list => {
        Cypress._.times($list.length, index => {
            TodoPage.removeButton.eq(0).click({ force: true });
            cy.wait(500); 
        });
    });

    TodoPage.emptyTaskMessage.should('be.visible').and('contain.text', 'No tasks found!');
});

  it('Test Case 04 - Search and Filter Functionality in todo App', () => {
    const tasks = ['buy groceries', 'clean house', 'wash clothes', 'visit doctor', 'finish reading book'];
      tasks.forEach(task => {
      cy.log(`Adding task: ${task}`);
      TodoPage.newTodoInput.clear().type(task);
      TodoPage.addButton.click();
      cy.wait(500); 
      cy.get('.panel-block.todo-item').should('contain.text', task); 
    });

    cy.get('.panel-block.todo-item').should('have.length', tasks.length);
  
     tasks.forEach((task, index) => {
      cy.log(`Validating task: ${task}`);
      cy.get('.panel-block.todo-item').eq(index).should('contain.text', task);
    });
  
    const searchTask = 'wash clothes';
    TodoPage.searchField.type(searchTask);
  
    cy.get('.panel-block.todo-item').should('have.length', 1).and('contain.text', searchTask);

  });

  it('Test Case 05 - Task Validation and Error Handling', () => {
    const longTask = 'a'.repeat(31);
    const validTask = 'do shopping for food';
    TodoPage.newTodoInput.clear();
    TodoPage.addButton.click();
    TodoPage.emptyTaskMessage.should('be.visible').and('contain.text', 'No tasks found!');
    TodoPage.newTodoInput.type(longTask);
    TodoPage.addButton.click();
    cy.contains('Error: Todo cannot be more than 30 characters!').should('be.visible');
    TodoPage.newTodoInput.clear().type(validTask);
    TodoPage.addButton.click();
    TodoPage.todoItems.should('have.length', 1);
    TodoPage.newTodoInput.clear().type(validTask);
    TodoPage.addButton.click();
    cy.contains(`Error: You already have ${validTask} in your todo list.`).should('be.visible');
  });
});