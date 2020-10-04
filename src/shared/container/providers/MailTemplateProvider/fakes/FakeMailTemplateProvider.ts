import IMailTemplateProvider from '../models/IMailTemplateprovider';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}

export default FakeMailTemplateProvider;
