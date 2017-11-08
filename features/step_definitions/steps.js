"use strict";
const { Given, When, Then } = require("cucumber");

Given(/^I am on AngularJS page$/, function () {
    return expect(browser.getTitle()).to.eventually.equal("AngularJS — Superheroic JavaScript MVW Framework.");
});

When(/^I add "([^"]*)" in the task field$/, function (task) {
    element(by.model('todoList.todoText')).sendKeys(task);
});

When(/^I click the add button$/, function () {
    var el = element(by.css('[value="add"]'));
    el.click();
});

Then(/^I should see my new task in the list$/, function () {
    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).to.eventually.equal(3);
    expect(todoList.get(2).getText()).to.eventually.equal('Do not Be Awesome');
});
