let notes = []

function loadNotes() {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
        notes = JSON.parse(savedNotes)
        $('#notlist').empty()
        notes.forEach(note => {
            const crossedClass = note.crossed ? ' crossed' : ''
            $('#notlist').append(`<li class="date">${note.date}</li><li class="first${crossedClass}" id="not"><b>${note.heading}</b><button class="butdel button"><span class="material-symbols-outlined">delete</span></button><button class="cross button"><span class="material-symbols-outlined">close</span></button><button class="edit"><span class="material-symbols-outlined">edit</span></button></li> <li class="second${crossedClass}" id="not">${note.text}</li>`)
        })
    }
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes))
}

let time = new Date()
console.log(time.getDay(), time.getMonth(), time.getFullYear())

$(document).ready(function () {
    loadNotes()

    $('#add').click(function() {
        const inputnot1 = $('#inputnot1').val()
        const inputnot2 = $('#inputnot2').val()

        let note = {
            "heading": inputnot1,
            "text": inputnot2,
            "date": parseDate(),
            "crossed": false
        }

        if (inputnot1 === "") {
            alert("Please fill in the left input.")
            $('#inputnot1, #inputnot2').val("")
            return
        }
        if (inputnot2 === "") {
            alert("Please fill in the right input.")
            $('#inputnot1, #inputnot2').val("")
            return
        }

        notes.push(note)
        saveNotes()

        $('#notlist').append(`<li class="date">${parseDate()}</li>
        <li class="first" id="not"><b>${$('#inputnot1').val()}</b>
        <button class="butdel button"><span class="material-symbols-outlined">delete</span></button><button class="cross button"><span class="material-symbols-outlined">close</span></button>
        <button class="edit"><span class="material-symbols-outlined">edit</span></button></li> 
        <li class="second" id="not">${$('#inputnot2').val()}</li>`)
        $('#inputnot1, #inputnot2').val("")
    })

    $('#notlist').on('click', '.butdel', function () {
        const $delone = $(this).parent()
        const $deltwo = $delone.next('.second')
        const $delthree = $delone.prev('.date')

        const headingToDelete = $delone.find('b').text()
        const textToDelete = $deltwo.text()
        const dateToDelete = $delthree.text()

        notes = notes.filter(note => !(note.heading === headingToDelete && note.text === textToDelete && note.date === dateToDelete))
        saveNotes()

        $delone.remove()
        $deltwo.remove()
        $delthree.remove()
    })

    $('#notlist').on('click', '.cross', function () {
        const $delone = $(this).parent()
        const $deltwo = $delone.next('.second')

        const headingToToggle = $delone.find('b').text()
        const textToToggle = $deltwo.text()
        const dateToToggle = $delone.prev('.date').text()

        const noteIndex = notes.findIndex(note =>
            note.heading === headingToToggle &&
            note.text === textToToggle &&
            note.date === dateToToggle
        )

        if (noteIndex !== -1) {
            notes[noteIndex].crossed = !notes[noteIndex].crossed
            saveNotes()
        }

        $delone.toggleClass("crossed")
        $deltwo.toggleClass("crossed")
    })

    $(document).on('click', '.btstyle, .btstyle2', function () {
        const body = $('body')
        const inpcont = $('.input-container, .input-container2')
        const input = $('input')
        const btstyle = $(this)
        const dark = $('.moon, .moon2')
        const sun = $('.sun, .sun2')

        const isDark = body.hasClass('body2')

        if (isDark) {
            body.removeClass('body2').addClass('body')
            inpcont.removeClass('input-container2').addClass('input-container')
            input.removeClass('input2').addClass('input')
            btstyle.removeClass('btstyle2').addClass('btstyle')
            dark.removeClass('moon2').addClass('moon')
            sun.removeClass('sun2').addClass('sun')
        } else {
            body.removeClass('body').addClass('body2')
            inpcont.removeClass('input-container').addClass('input-container2')
            input.removeClass('input').addClass('input2')
            btstyle.removeClass('btstyle').addClass('btstyle2')
            dark.removeClass('moon').addClass('moon2')
            sun.removeClass('sun').addClass('sun2')
        }
    })

    $('#notlist').on('click', '.edit', function () {
        const $p = $(this).parent(), $s = $p.next()
        if ($p.next().hasClass('edit-form')) return
        $s.after(`
            <div class="edit-form">
                <input value="${$p.find('b').text()}" class="input" style="width: 150px;">
                <input value="${$s.text()}" class="input" style="width: 300px;">
                <button class="button save-edit">Save</button>
            </div>`)
    })
})

function parseDate(){
    date = new Date()
    y = date.getFullYear()
    d = date.getDate()
    m = date.getMonth() + 1
    ht = date.getHours()
    mt = date.getMinutes()
    st = date.getSeconds()

    return `${d}/${m}/${y} ${ht}:${mt}:${st}`
}