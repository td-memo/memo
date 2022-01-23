const { getUserName, entryTypes, getEntries, toData } = Netlify
const { col, initTable, typeToTitle, basicColumns } = Tables
const { html } = Utils
const { UsernameSetter } = Components.Profile
const { initComponent, WithRemoteData } = Components

const ProfileLists = (username) => initComponent({
  content: ({ include }) => html`
    <div class="row">
      ${entryTypes
        .map(type => include(ProfileList(username, type)))
        .join('')
      }
    </div>
  `
})


Components.Profile.ProfileLists = ProfileLists

///////////////////////////////////////////////////////////////////////////////

const ProfileList = (username, type) => initComponent({
  content: ({ include }) => html`
    <div class="col-md-6">
      <h3><a href="/list?type=${type}&user=${username}">${typeToTitle[type]}</a></h3>
      ${include(WithRemoteData({
        remoteData: getEntries(type, username),
        component: (resp) => ProfileTable(type, toData(resp))
      }))}
    </div>
  `
})

const ProfileTable = (type, data) => initComponent({
  content: () => html`
    <table id="summary-${type}"></table>
  `,
  initializer: () => {
    initProfileTable(typeToCssId(type), data)
  }
})

const initProfileTable = (selector, data) => initTable(selector, data, {
  iconsPrefix: 'fa',
  pagination: true,
  pageSize: 5,
  onlyInfoPagination: true,
  columns: basicColumns(),
})

const typeToCssId = (type) => `#summary-${type}`