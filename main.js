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

async function CreateFIDOCredentials(index, count) {
  let createCreds = [
    ['80100000BF01A5015820CAB2210B9A3AE4F877F8ED56318C2CE5D9D2DE8326B70CA0174B55F2DA18EE6A02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A36269644E6B65793140676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793140676D61696C2E636F6D6469636F6E78196869642E676C6F62616C2E6B65793140676D61696C2E636F6D0481A263616C672664747970656A7075626C69632D6B657907A162726BF500'], 

    ['90100000FF01A5015820973FB38535A114040E5483632A8F66404374676B79F2CAE947EAFD3FB69071ED02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644E6B65793240676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793240676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167653F', 
    '80100000AE636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D6578196869642E676C6F62616C2E6B65793240676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000BF01A5015820CAB2210B9A3AE4F877F8ED56318C2CE5D9D2DE8326B70CA0174B55F2DA18EE6A02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A36269644E6B65793340676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793340676D61696C2E636F6D6469636F6E78196869642E676C6F62616C2E6B65793340676D61696C2E636F6D0481A263616C672664747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['90100000FF01A5015820973FB38535A114040E5483632A8F66404374676B79F2CAE947EAFD3FB69071ED02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644E6B65793440676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793440676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167653F', 
    '80100000AE636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D6578196869642E676C6F62616C2E6B65793440676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000BF01A5015820CAB2210B9A3AE4F877F8ED56318C2CE5D9D2DE8326B70CA0174B55F2DA18EE6A02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A36269644E6B65793540676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793540676D61696C2E636F6D6469636F6E78196869642E676C6F62616C2E6B65793540676D61696C2E636F6D0481A263616C672664747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['90100000FF01A5015820973FB38535A114040E5483632A8F66404374676B79F2CAE947EAFD3FB69071ED02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644E6B65793640676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793640676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167653F', 
    '80100000AE636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D6578196869642E676C6F62616C2E6B65793640676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000BF01A5015820CAB2210B9A3AE4F877F8ED56318C2CE5D9D2DE8326B70CA0174B55F2DA18EE6A02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A36269644E6B65793740676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793740676D61696C2E636F6D6469636F6E78196869642E676C6F62616C2E6B65793740676D61696C2E636F6D0481A263616C672664747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['90100000FF01A5015820973FB38535A114040E5483632A8F66404374676B79F2CAE947EAFD3FB69071ED02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644E6B65793840676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793840676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167653F', 
    '80100000AE636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D6578196869642E676C6F62616C2E6B65793840676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000BF01A5015820CAB2210B9A3AE4F877F8ED56318C2CE5D9D2DE8326B70CA0174B55F2DA18EE6A02A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A36269644E6B65793940676D61696C2E636F6D646E616D6578196869642E676C6F62616C2E6B65793940676D61696C2E636F6D6469636F6E78196869642E676C6F62616C2E6B65793940676D61696C2E636F6D0481A263616C672664747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579313040676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579313040676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579313040676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793131646E616D65781A6869642E676C6F62616C2E6B6579313140676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579313140676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579313240676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579313240676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579313240676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793133646E616D65781A6869642E676C6F62616C2E6B6579313340676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579313340676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579313440676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579313440676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579313440676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793135646E616D65781A6869642E676C6F62616C2E6B6579313540676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579313540676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579313640676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579313640676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579313640676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793137646E616D65781A6869642E676C6F62616C2E6B6579313740676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579313740676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579313840676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579313840676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579313840676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793139646E616D65781A6869642E676C6F62616C2E6B6579313940676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579313940676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579323040676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579323040676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579323040676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793231646E616D65781A6869642E676C6F62616C2E6B6579323140676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579323140676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579323240676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579323240676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579323240676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793233646E616D65781A6869642E676C6F62616C2E6B6579323340676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579323340676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500'], 
    
    ['90100000FF01A50158201A57C67527BF172086C7D79A2CDAD54486FF08066DFF249457CA6FF0CA17D13102A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A46269644F6B6579323440676D61696C2E636F6D646E616D65781A6869642E676C6F62616C2E6B6579323440676D61696C2E636F6D6469636F6E78C868747470733A2F2F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F66696C6570686F746F3A5573657254696C655374617469632F50726F66696C65496D6167', 
    '80100000B1653F636B3D312F73746F726167652E6C6976652E636F6D2F75736572732F3078414439443534463044344431384542352F6D7970726F66696C652F65787072657373696F6E70726F66696C652F70726F3132336B646973706C61794E616D65781A6869642E676C6F62616C2E6B6579323440676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657907A162726BF500'], 
    
    ['80100000DF01A601582049DBC6913C067728B423CD5CBB673F94AC0B2A89EA3A234DD12D8C8BED95651002A2626964736C6F67696E2E6D6963726F736F66742E636F6D646E616D65694D6963726F736F667403A3626964456B65793235646E616D65781A6869642E676C6F62616C2E6B6579323540676D61696C2E636F6D6469636F6E781A6869642E676C6F62616C2E6B6579323540676D61696C2E636F6D0482A263616C672664747970656A7075626C69632D6B6579A263616C6739010064747970656A7075626C69632D6B657906A16B686D61632D736563726574F507A162726BF500']
  ];
  console.log('Creating ' + count + ' FIDO credentials in ' + _readers[index].name);
  let startTime = new Date();
  let output = '';
  let atr = await _readers[index].connect(true);
  if (count > 25) count = 25;
  for (let i = 0; i < count; i++) {
    console.log('Creating FIDO credential ' + (i + 1) + ' of ' + count);
    let res = await _readers[index].transcieve('00A4040008A0000006472F0001');
    output += res;
    for (const command of createCreds[i]) {
      console.log(command);
      res = await _readers[index].transcieve(command);
      console.log(res);
      output += '> ' + command + '\n<' + res + '\n';
    }
  }
  _readers[index].disconnect();
  let elapsed = new Date() - startTime;
  output += 'Total: ' + elapsed + 'ms'
  await GetMemory(index);
  console.log(output);
}

async function CreatePKICredentials(index, count, algo) {
  const createCreds = [
    ['9A', '05'],
    ['9C', '0A'],
    ['9D', '0B'],
    ['9E', '01'],
    ['82', '0D'],
    ['83', '0E'],
    ['84', '0F'],
    ['85', '10'],
    ['86', '11'],
    ['87', '12'],
    ['88', '13'],
    ['89', '14'],
    ['8A', '15'],
    ['8B', '16'],
    ['8C', '17'],
    ['8D', '18'],
    ['8E', '19'],
    ['8F', '1A'],
    ['90', '1B'],
    ['91', '1C'],
    ['92', '1D'],
    ['93', '1E'],
    ['94', '1F'],
    ['95', '20'],
  ];
  console.log('Creating ' + count + ' PKI credentials in ' + _readers[index].name);
  let startTime = new Date();
  let output = '';
  let atr = await _readers[index].connect(true);
  if (count > 24) count = 24;
  for (let i = 0; i < count; i++) {
    console.log('Creating PKI credential ' + (i + 1) + ' of ' + count);
    let cmd = '00A404000BA000000308000010000100'
    let res = await _readers[index].transcieve(cmd);
    output += '> ' + cmd + '\n<' + res + '\n';
    cmd = '00200080083030303030303030'
    res = await _readers[index].transcieve(cmd);
    output += '> ' + cmd + '\n<' + res + '\n';
    switch (algo) {
      case 'P256':
        cmd = '004700' + createCreds[i][0] + '05AC03800111';
        break;
      case 'P384':
        cmd = '004700' + createCreds[i][0] + '05AC03800111';
        break;
      case 'R256':
        cmd = '004700' + createCreds[i][0] + '0AAC088001078103010001';
        break;
    }
    res = await _readers[index].transcieve(cmd);
    output += '> ' + cmd + '\n<' + res + '\n';
    res = await _readers[index].transcieve('10DB3FFFFF5C035FC1' + createCreds[i][1] + '5382018E708201851F8B08000000000000003368625C60D0C4A8B68099899189898DB14E9BF354A901171B87569BC7395B166666033E431E209F3994859987D9D739C8404E9CD7C8C8C0D0C0D4D0CCD0D2C8320ACC3533B0807231D4971908B0B1834D63626463D56E646150624E626051DDEAA891B0EBD4529D4D4EFA3352BEA8DE4FB3F83B79D5A20781D21C574A1FA5E5EFB8FD40F96540D20A95ABFB74ED1C276524342E9AAB52A72CEDFE66F2A57755C6D15AEB9D3C7C4F6EBE73D3416F6539C39699AFFFFAC69DF7DFBCA5F58AED84157343372D0E3608349005BA43968F458C45645BEF2AC1659F32B48ACA7714B2DD71E77ADE7CA6DA');
    res = await _readers[index].transcieve('00DB3FFF98401E24ADCC226120D6805D013F48813023E37F1656036620851C30CC190C06A94C860C931F543EE98C60F85B67A81DF0EB4AE242C666AF1FD3E5FAD252A78570969C3ADDB6A1A7552A4937E0FE4783A33B778628773319A808193CF97A2F29FE8793EBB26F3A9DF2DBFEB5BA7E5ECF54CB5C9A71EDB6EE5DFEFFDDC2C636512773B8636666CA5C9F2006002966D777A4010000710101FE0000');
    console.log(res);
    output += '<' + res + '\n';
  }
  _readers[index].disconnect();
  let elapsed = new Date() - startTime;
  output += 'Total: ' + elapsed + 'ms'
  await GetMemory(index);
  console.log(output);
}

async function CreateCredentials(index) {
  let count = document.getElementById('credentialCount').value;
  switch (document.getElementById('credentialType').value) {
    case 'FIDO':
      await CreateFIDOCredentials(index, count);
      break;
    case 'PKI':
      let algo = document.getElementById('credentialAlgo').value;
      await CreatePKICredentials(index, count, algo);
      break;
  }
  await GetMemory(index);
}

async function GetMemory(index) {
  console.log('Get Memory from ' + _readers[index].name);
  let atr = await _readers[index].connect(true);
  let output = '';
  let res = await _readers[index].transcieve('00A4040000');
  res = await _readers[index].transcieve('80CA00FE02DF25');
  console.log('< ' + res + '\n');
  let available = parseInt('0x' + res.substr(38, 8), 16);
  document.getElementById('memoryAvailable').innerHTML = available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById('credentialsUsage').style.width = available < 69304 ? ((69304 - available) * 100 / 82932).toString() + '%' : '0%';
  _readers[index].disconnect();
}

async function GetPinProperties(index) {
  console.log('Get Pin Properties from ' + _readers[index].name);
  let atr = await _readers[index].connect(true);
  let res = await _readers[index].transcieve('00A4040007A0000000791000');
  res = await _readers[index].transcieve('005602000131');
  console.log('< ' + res + '\n');
  if (res.length > 7) {
    let props = "Min: " + parseInt(res.substr(4, 2), 16) + " Max: " + parseInt(res.substr(6, 2), 16) + (res.substr(12, 2) == 'A5' ? " Numeric" : " Alphanumeric");
    document.getElementById('currentPinProps').value = props;
  }
  _readers[index].disconnect();
}

async function SetPinProperties(index) {
  console.log('Set Pin Properties on ' + _readers[index].name);
  let atr = await _readers[index].connect(true);
  let output = '';
  let res = await _readers[index].transcieve('00A4040007A0000000791000');
  console.log('< ' + res + '\n');
  res = await _readers[index].transcieve('00200000083030303030303030');
  console.log('< ' + res + '\n');
  let cmd = '002608000601' + ('00' + parseInt(document.getElementById('minPinLen').value)).substr(-2) + ('00' + parseInt(document.getElementById('maxPinLen').value)).substr(-2) + '0000' + (document.getElementById('pinTypeNumeric').checked ? 'A5' : '00');
  res = await _readers[index].transcieve(cmd);
  console.log('> ' + cmd + '\n< ' + res + '\n');
  _readers[index].disconnect();
}


async function ResetCard(index) {
  console.log('Resetting card in ' + _readers[index].name);
  let atr = await _readers[index].connect(true);
  let output = '';
  let res = await _readers[index].transcieve('00A4040007A0000000791000');
  console.log('< ' + res + '\n');
  res = await _readers[index].transcieve('00200000083030303030303030');
  console.log('< ' + res + '\n');
  res = await _readers[index].transcieve('80380000');
  console.log('< ' + res + '\n');
  res = await _readers[index].transcieve('00A4040008A0000006472F0001');
  console.log('< ' + res + '\n');
  res = await _readers[index].transcieve('801000000107');
  console.log('< ' + res + '\n');
  _readers[index].disconnect();
  GetMemory(index);
}

navigator.webcard.cardInserted = function(reader) {
  let button = document.getElementById('activeReader');
  if (button.innerHTML = reader.name) {
    button.classList.remove('btn-secondary');
    button.classList.add('btn-success');
    button.disabled = false;
    button.nextElementSibling.classList.remove('btn-secondary');
    button.nextElementSibling.classList.add('btn-success');
  }
  console.log('Card inserted in ' + reader.name);
}

navigator.webcard.cardRemoved = function(reader) {
  let button = document.getElementById('activeReader');
  if (button.innerHTML = reader.name) {
    button.classList.remove('btn-success');
    button.classList.add('btn-secondary');
    button.disabled = true;
    button.nextElementSibling.classList.remove('btn-success');
    button.nextElementSibling.classList.add('btn-secondary');
  }
  console.log('Card removed from ' + reader.name)
}