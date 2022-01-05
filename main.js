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

async function CreateCredentials(index) {
  console.log('Creating credentials in ' + _readers[index].name);
  let startTime = new Date();
  let atr = await _readers[index].connect(true);
  let apduList = [
    '00A4040000','80CA00FE02DF25',
  ];
  for (let i = 0; i < apduList.length; i++) {
    var res = await _readers[index].transcieve(apduList[i]);
    output += '> ' + apduList[i] + '\n< ' + res + '\n';
  }
  _readers[index].disconnect();
  let elapsed = new Date() - startTime;
  output += 'Total: ' + elapsed + 'ms'
  console.log(output);
}

async function GetMemory(index) {
  console.log('Get Memory from ' + _readers[index].name);
  let atr = await _readers[index].connect(true);
  let output = '';
  let res = await _readers[index].transcieve('00A4040000');
  res = await _readers[index].transcieve('80CA00FE02DF25');
  console.log('> ' + res + '\n');
  document.getElementById('memoryAvailable').innerHTML = parseInt('0x' + res.substr(38, 8), 16);
  _readers[index].disconnect();
}

async function ResetCard(index) {
  console.log('Resetting card in ' + _readers[index].name);
  let atr = await _readers[index].connect(true);
  let output = '';
  let res = await _readers[index].transcieve('00A4040007A0000000791000');
  console.log('> ' + res + '\n');
  res = await _readers[index].transcieve('00200000083030303030303030');
  console.log('> ' + res + '\n');
  res = await _readers[index].transcieve('80380000');
  console.log('> ' + res + '\n');
  res = await _readers[index].transcieve('00A4040008A0000006472F0001');
  console.log('> ' + res + '\n');
  res = await _readers[index].transcieve('801000000107');
  console.log('> ' + res + '\n');
  _readers[index].disconnect();
  GetMemory(index);
}

navigator.webcard.cardInserted = function(reader) {
  console.log('Card inserted in ' + reader.name);
}

navigator.webcard.cardRemoved = function(reader) {
  console.log('Card removed from ' + reader.name)
}