class TodoPage {
    get todoModalTitle() {
      return cy.get('p.panel-heading');
    }
  
    get newTodoInput() {
      return cy.get('input#input-add');
    }
  
    get addButton() {
      return cy.get('button#add-btn');
    }
  
    get searchField() {
      return cy.get('input#search');
    }
  
    get emptyTaskMessage() {
      return cy.get('.panel-block.todo-item.ml-1.has-text-danger');
    }
  
    get completedTodoItem() {
      return cy.get('.fa-circle-check');
    }
  
    get removeButton() {
      return cy.get('.has-text-danger.destroy');
    }
  
    get todoItems() {
      return cy.get('.panel-block.todo-item');
    }
  }
  
  export default new TodoPage();
  