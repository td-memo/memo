const { html, css } = Utils
const { initComponent } = Components
const { statusToTitle } = Tables

const PersonalFields = (data, type) => initComponent({
  content: () => html`
    <div id="personal-fields">
      <div style="margin: 15px 0">
        <label for="status">Status</label><br>
        <select name="status" id="status">
          ${
            ['InProgress', 'Completed', 'Dropped', 'Planned']
              .map((status) => html`
                <option value="${status}" ${status == data.status ? 'selected' : ''}>
                  ${statusToTitle(type, status)}
                </option>
              `)
              .join('')
          }
        </select>
      </div>
      <div style="margin: 15px 0">
        <label for="score">${data.status === 'Planned' ? 'Preference' : 'Score'}</label><br>
        <select name="score" id="score">
          ${
            ['10','9','8','7','6','5','4','3','2','1']
              .map((num) => html`
                <option value="${num}" ${num == data.score ? 'selected' : ''}>
                  ${num}
                </option>
              `)
              .join('')
          }
        </select>
      </div>
      ${type === 'tv_shows'
        ? html`
          <div
            id="progress-container"
            style="margin: 15px 0; display: ${data.status !== 'Completed' ? 'block' : 'none'};}"
          >
            <label for="progress">Episodes watched</label><br>
            <input
              id="progress"
              type="number"
              value="${data.progress ?? ''}"
            >
          </div>
        `
        : ''
      }
      ${type !== 'films'
        ? html`
          <div
            id="started-date-container"
            style="margin: 15px 0; display: ${data.status !== 'Planned' ? 'block' : 'none'};}"
          >
            <label for="started-date">Started Date</label><br>
            <input
              data-toggle="datepicker"
              id="started-date"
              autocomplete="off"
              value="${data.startedDate ? timestampToString(data.startedDate) : today()}"
            >
          </div>
        `
        : ''
      }
      <div
        id="completed-date-container"
        style="margin: 15px 0; display: ${data.status === 'Completed' ? 'block' : 'none'};}"
      >
        <label for="completed-date">Completed Date</label><br>
        <input
          data-toggle="datepicker"
          id="completed-date"
          autocomplete="off"
          value=${data.completedDate ? timestampToString(data.completedDate) : ''}
        >
      </div>
      <div style="margin: 15px 0">
        <label for="review">Comments</label><br>
        <textarea id="review" name="review" rows="4" cols="21">${data.review ?? ''}</textarea>
      </div>
    </div>
  `,
  initializer: () => {
    if (document.getElementById('started-date')) {
      new Litepicker({ element: document.getElementById('started-date') })
    }
    if (document.getElementById('completed-date')) {
      new Litepicker({ element: document.getElementById('completed-date') })
    }

    $('#status').on('change', () => {
      if ($('#status').val() === 'Planned') {
        $('#progress-container').show()
        $('label[for="score"]').html('Preference')
        ;['started-date', 'completed-date'].forEach((field) => {
          $(`#${field}`).val('')
          $(`#${field}-container`).hide()
        })
        $('#progress-container').show()
      } else if ($('#status').val() === 'Dropped') {
        $('label[for="score"]').html('Score')
        $('#progress-container').show()
        $('#started-date-container').show()
        $('#completed-date').val('')
        $('#completed-date-container').hide()
      } else if ($('#status').val() === 'Completed') {
        $('label[for="score"]').html('Score')
        $('#started-date-container').show()
        $('#completed-date-container').show()
        $('#completed-date').val(today())
        $('#progress-container').hide()
        $('#progress-container').val($('#episodes').html())
      } else if ($('#status').val() === 'InProgress') {
        $('label[for="score"]').html('Score')
        $('#started-date-container').show()
        $('#completed-date').val('')
        $('#started-date').val(today())
        $('#completed-date-container').hide()
        $('#progress-container').show()
      }
        
    })
  }
})

Components.List.PersonalFields = PersonalFields

///////////////////////////////////////////////////////////////////////////////

const today = () =>
  (new Date()).toISOString().substring(0, 10)

const timestampToString = (ts) =>
  (new Date(ts)).toISOString().substring(0, 10)