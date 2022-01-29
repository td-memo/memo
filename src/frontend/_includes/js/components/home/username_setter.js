const { html } = Utils
const { initComponent } = Components
const { InputWithAction, showNotification } = Components.UI

const UsernameSetter = () => initComponent({
  content: ({ include }) => include(InputWithAction({
    label: "Pick a username to start using Memo.",
    btnLabel: "Submit",
    onSubmit: (newName) => {
      Netlify.setName(newName)
        .map((resp) => {
          if (resp.error) {
            showNotification('This username is already taken.')
          } else {
            showNotification('Successfully picked new name. You will be redirected in 3 seconds.')

            setTimeout(() => { window.location.href = `/profile?user=${newName}` }, 3000)
          }
        })
    }
  }))
})

Components.Home.UsernameSetter = UsernameSetter
