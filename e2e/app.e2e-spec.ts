import { InformationBrowserPage } from './app.po';

describe('information-browser App', () => {
  let page: InformationBrowserPage;

  beforeEach(() => {
    page = new InformationBrowserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
