const fakeUser = {
  attribute: [
    { name: 'eff_user:billing:default:id', values: { value: ['4036306'] } },
    { name: 'eff_user:language', values: { value: ['fi'] } },
    { name: 'eff_user:family_name', values: { value: ['Rupainis'] } },
    { name: 'config:fi:product:admin:id', values: { value: ['107'] } },
    {
      name: 'eff_user:email',
      values: { value: ['sergejs.rupainis@posti.com'] },
    },
    { name: 'eff_user:client:id', values: { value: ['99991'] } },
    { name: 'config:pagelayout:admin:id', values: { value: ['5723'] } },
    { name: 'eff_user:client:company:form', values: { value: ['PARENT'] } },
    { name: 'auth_user:concern:id', values: { value: ['99991'] } },
    { name: 'eff_user:servicelevel', values: { value: ['basic'] } },
    { name: 'rest:client:id', values: { value: ['REST'] } },
    { name: 'auth_user:roles', values: { value: ['KontaktiUser'] } },
    { name: 'config:rus:product:admin:id', values: { value: ['7284'] } },
    { name: 'auth_user:account', values: { value: ['sergejru'] } },
    { name: 'auth_user:given_name', values: { value: ['Sergejs'] } },
    { name: 'eff_user:given_name', values: { value: ['Sergejs'] } },
    { name: 'eff_user:roles', values: { value: ['KontaktiUser'] } },
    { name: 'eff_user:user_type', values: { value: ['POSTI_ID'] } },
    {
      name: 'eff_user:client:name',
      values: { value: ['Posti PS Mrkting Srvcs'] },
    },
    {
      name: 'auth_user:concern:parent:company:id',
      values: { value: ['99991'] },
    },
    {
      name: 'auth_user:billing:default:id',
      values: { value: ['4036306'] },
    },
    { name: 'eff_user:id', values: { value: ['101109'] } },
    { name: 'auth_user:user_type', values: { value: ['POSTI_ID'] } },
    { name: 'auth_user:client:id', values: { value: ['99991'] } },
    { name: 'auth_user:id', values: { value: ['101109'] } },
    {
      name: 'auth_user:billing:default:external:id',
      values: { value: ['429342'] },
    },
    { name: 'config:ums:demo:customer:id', values: { value: ['113'] } },
    {
      name: 'eff_user:client:customercode',
      values: { value: ['FI01093579'] },
    },
    {
      name: 'eff_user:billing:default:name',
      values: {
        value: ['Posti Oy DM Ratkaisut, PL 1234, 70101 KUOPIO, FI'],
      },
    },
    {
      name: 'auth_user:email',
      values: { value: ['sergejs.rupainis@posti.com'] },
    },
    {
      name: 'eff_user:billing:default:external:id',
      values: { value: ['429342'] },
    },
    {
      name: 'auth_user:client:company:form',
      values: { value: ['PARENT'] },
    },
    { name: 'interface:id', values: { value: ['Flash'] } },
    { name: 'auth_user:family_name', values: { value: ['Rupainis'] } },
    { name: 'eff_user:country', values: { value: ['FI'] } },
    { name: 'auth_user:language', values: { value: ['fi'] } },
    {
      name: 'auth_user:client:customercode',
      values: { value: ['FI01093579'] },
    },
    { name: 'eff_user:concern:id', values: { value: ['99991'] } },
    { name: 'auth_user:country', values: { value: ['FI'] } },
    {
      name: 'auth_user:billing:default:name',
      values: {
        value: ['Posti Oy DM Ratkaisut, PL 1234, 70101 KUOPIO, FI'],
      },
    },
    { name: 'eff_user:account', values: { value: ['sergejru'] } },
    {
      name: 'auth_user:client:name',
      values: { value: ['Posti PS Mrkting Srvcs'] },
    },
    {
      name: 'eff_user:concern:parent:company:id',
      values: { value: ['99991'] },
    },
    { name: 'config:product:admin:id', values: { value: ['89'] } },
  ],
};

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export default {
  getUserInfo: token =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === 0) {
          reject(new HttpError('Sample error', 401));
        } else {
          resolve(fakeUser);
        }
      }, 1000);
    }),
};
