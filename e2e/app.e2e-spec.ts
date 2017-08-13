import { KlabbyProPage } from './app.po';

describe('klabby-pro App', function() {
  let page: KlabbyProPage;

  beforeEach(() => {
    page = new KlabbyProPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
