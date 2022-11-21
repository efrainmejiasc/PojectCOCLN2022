import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export const buildExcel = ( header: Array<string>, data: any, excelName: string, bookTitle = "Reporte") => {

    let headerLength = [];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const keys = Object.keys(data[0]);

    keys.map( key => {
        const max_width = data.reduce((w: any, r: any) => Math.max(w, r[key] ? r[key].length : 0), 10);
        headerLength = [ 
            ...headerLength, 
            { wch: max_width } 
        ];
    });
    worksheet["!cols"] = [ ...headerLength ];

    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: "A1" });

    const workbook: XLSX.WorkBook = { Sheets: { [bookTitle]: worksheet }, SheetNames: [bookTitle] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    saveAsExcelFile(excelBuffer, excelName);
    
};

const saveAsExcelFile = (buffer: any, fileName: string): void => {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
}