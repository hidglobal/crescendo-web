var _readers;

async function ListReaders() {
  let reader_ul = document.getElementById('readerList');
  while (reader_ul.firstChild) {
    reader_ul.removeChild(reader_ul.firstChild);
  }
  _readers = await navigator.webcard.readers();
  console.log(_readers.length + " readers detected");
  _readers.forEach((reader, index) => {
    let node = document.createElement('li');
    reader_ul.append(node)
    node.outerHTML = `
    <li><a class="dropdown-item" tabindex="${index}" href="#">
      ${reader.name}
    </a></li>
    `;
  });
  if (_readers.length > 0) {
    let button = reader_ul.parentElement.firstElementChild;
    button.innerHTML = `${_readers[0].name}`;
    button.disabled = false;
  }
}

async function TestReader(index) {
  let startTime = new Date();
  let atr = await _readers[index].connect(true);
  let apduList = document.getElementById('apduList').value.match(/(^[0-9A-Fa-f]+$)/gm);
  let output = 'Testing card in ' + _readers[index].name + '\n';
  for (let i = 0; i < apduList.length; i++) {
    var res = await _readers[index].transcieve(apduList[i]);
    output += '> ' + apduList[i] + '\n< ' + res + '\n';
    document.getElementById('apduList').value = output;
  }
  _readers[index].disconnect();
  let elapsed = new Date() - startTime;
  output += 'Total: ' + elapsed + 'ms'
  document.getElementById('apduList').value = output;
}

async function GetMemory(index) {
  console.log('Testing ' + _readers[index].name);
  let atr = await _readers[index].connect(true);
  let output = '';
  let res = await _readers[index].transcieve('00A4040000');
  console.log('> ' + res + '\n');
  res = await _readers[index].transcieve('80CAFF0101B900');
  console.log('> ' + res + '\n');
  _readers[index].disconnect();
}

navigator.webcard.cardInserted = function(reader) {
  console.log('Card inserted in ' + reader.name);
}

navigator.webcard.cardRemoved = function(reader) {
  console.log('Card removed from ' + reader.name)
}