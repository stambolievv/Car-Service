const overlay = document.createElement('div');
overlay.className = 'overlay';

const modal = document.createElement('div');
modal.className = 'modal';

const msg = document.createElement('p');
const divActions = document.createElement('div');
divActions.className = 'actions';

const divOk = document.createElement('div');
const aOk = document.createElement('a');
aOk.textContent = 'ДА';
aOk.className = 'btn-info';
aOk.href = 'javascript:void(0)';
divOk.appendChild(aOk);

const divCancel = document.createElement('div');
const aCancel = document.createElement('a');
aCancel.textContent = 'ОТКАЗ';
aCancel.className = 'btn-danger';
aCancel.href = 'javascript:void(0)';
divCancel.appendChild(aCancel);

divActions.appendChild(divOk);
divActions.appendChild(divCancel);

modal.appendChild(msg);
modal.appendChild(divActions);

overlay.appendChild(modal);

aOk.addEventListener('click', () => onChoice(true));
aCancel.addEventListener('click', () => onChoice(false));

let onChoice = null;

export function showModal(message) {
    msg.textContent = message;
    document.body.appendChild(overlay);
    return new Promise(callback => {
        onChoice = (choice) => {
            clear();
            callback(choice);
        };
    });
}

function clear() {
    overlay.remove();
}

/* <div class="overlay">
    <div class="modal">
        <p>MESSAGE</p>
        <div><a>Yes</a></div>
        <div><a>Cancel</a></div>
    </div>
</div> */