interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'mailtrap';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailtrap',
  defaults: {
    from: {
      email: 'jonashenrique@jonasdev.app',
      name: ' Jonas from Caatinga',
    },
  },
} as IMailConfig;
