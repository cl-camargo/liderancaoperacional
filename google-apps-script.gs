/**
 * Script para receber os cadastros do formulário do site
 * "Liderança Operacional na Prática" e salvar cada envio como
 * uma nova linha nesta planilha.
 *
 * COMO USAR:
 * 1. Abra (ou crie) uma Planilha Google.
 * 2. Menu Extensões > Apps Script.
 * 3. Apague o conteúdo padrão e cole todo este arquivo.
 * 4. Clique em "Implantar" > "Nova implantação".
 * 5. Tipo: "App da Web".
 * 6. Executar como: "Eu".
 * 7. Quem pode acessar: "Qualquer pessoa".
 * 8. Clique em "Implantar", autorize as permissões pedidas.
 * 9. Copie a URL do App da Web gerada (termina em /exec).
 * 10. Cole essa URL na constante SCRIPT_URL do arquivo script.js do site.
 */

const SHEET_NAME = 'Cadastros';

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nome || '',
    data.empresa || '',
    data.whatsapp || '',
    data.email || '',
    data.qtd || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Data/Hora', 'Nome', 'Empresa', 'WhatsApp', 'E-mail', 'Quantidade de pessoas']);
    sheet.setFrozenRows(1);
  }

  return sheet;
}
