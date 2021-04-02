/**
 * Storybook Test(s)
 *
 * Storybook is effectively an entirely separate application
 * with its own build configuration. In practice it can break
 * while we're working on our app, updating dependencies, etc.
 *
 * This test aims to catch when it breaks.
 */

const EXPECTED = {
  /**
   * How many items to expect in the left-side nav.
   * This is tricky because of the hierarchy.
   */
  NUM_NAV_ITEMS: 4,
  /**
   * How many stories we expect to visit.
   */
  NUM_STORIES_VISITED: 5,
};

describe("Storybook", () => {
  it("visits stories", () => {
    cy.visit("/");

    getIframeBody().should("exist");

    // Count how many items are in the left-side nav.
    // This is tricky because of the hierarchy.
    cy.get("#storybook-explorer-tree [data-nodetype]", {
      timeout: 3 * 60 * 1000,
    }).should("have.length.greaterThan", EXPECTED.NUM_NAV_ITEMS);

    walk("", "", 1);
  });
});

function walk(oldUrl: string, oldStoryName: string, count: number) {
  cy.url().then((newUrl) => {
    cy.log(`${count} - ${newUrl}`);
    storyRendersSuccessfully();

    if (newUrl === oldUrl) {
      cy.log(`Found the end after ${count} stories.`);

      // Sanity check in case something goes wrong with the walk:
      expect(count).to.be.greaterThan(EXPECTED.NUM_STORIES_VISITED);
    } else {
      getSelectedStory()
        .should((e) => {
          expect(e.text()).not.to.eq(oldStoryName);
        })
        .then((e) => {
          const newStoryName = e.text();
          cy.get("body").type("{alt}{rightarrow}");
          walk(newUrl, newStoryName, count + 1);
        });
    }
  });
}

const getSelectedStory = () => cy.get('.sidebar-item[data-selected="true"]');

function storyRendersSuccessfully() {
  // This is a coarse approximation, but it detects React "Red Box" error pages.
  getIframeBody().should("not.contain.text", "Error:");
}

// https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
const getIframeDocument = () =>
  cy.get("#storybook-preview-iframe").its("0.contentDocument").should("exist");

const getIframeBody = () =>
  getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap);

export {};
