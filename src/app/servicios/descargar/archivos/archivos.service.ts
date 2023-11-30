import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs


@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  private workbook!: Workbook

  constructor() { }

  async descargarPdfTodoElHistorialClinico(historia: any[]) {
    const tablas = [];
    for (const hs of historia) {
      const titulos = ["Altura", "Peso", "Temperatura", "Presión"];
      const valores = [hs.datos.altura, hs.datos.peso, hs.datos.temperatura, hs.datos.presion];
  
      for (const titulo of hs.datosDinamicos) {
        titulos.push(titulo.clave);
        valores.push(titulo.dato);
      }

      titulos.push("Comentario");
      valores.push(hs.datos.comentario);
  
      const tabla = {
        table: {
          body: [
            titulos.map((titulo) => ({ text: titulo, style: 'tableHeader' })),
            valores.map((valor) => ({ text: valor, style: 'tableContent' })),
          ],
        },
      };
  
      tablas.push(tabla);
    }
    const pdfDefinicion: any = {
      content: [
        { image: await this.obtenerImagenBase64("../../../../assets/iconos/android-chrome-192x192.png"), width: 120 }, 
        { text: "Clinica Online", style: 'titulo' },
        { text: "", margin: [0, 10] },
        { text: "Historial Clinico", style: 'titulo' },
        { text: "", margin: [0, 10] },
        ...tablas,  // Utiliza el spread operator para expandir el array de tablas
        { text: "", margin: [0, 10] },
        { text: "Fecha de Emisión: " + new Date().toISOString(), style: 'titulo' },
      ],
      styles: {
        titulo: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          alignment: 'center',
        },
        tableContent: {
          alignment: 'center',
        },
      },
    };
  
    const pdf = pdfMake.createPdf(pdfDefinicion);
    pdf.open();
  }

  private obtenerImagenBase64(rutaImagen: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = rutaImagen;
    });
  }
  
  
  

  descargarPdfHistorialClinico(historia: any) {
    let titulos = ["Altura", "Peso", "Temperatura", "Presión"];
    let valores = [historia.datos.altura, historia.datos.peso, historia.datos.temperatura, historia.datos.presion];
  
    for (let titulo of historia.datosDinamicos) {
      titulos.push(titulo.clave);
      valores.push(titulo.dato);
    }
  
    const pdfDefinicion: any = {
      content: [
        {
          text: "Clinica Online",
          style: 'titulo'
        },
        {
          text: "", // Agregar espacio vertical entre el título y la tabla
          margin: [0, 10]
        },
        {
          table: {
            body: [
              titulos.map((titulo) => ({ text: titulo, style: 'tableHeader' })),
              valores.map((valor) => ({ text: valor, style: 'tableContent' })),
            ],
            alignment: 'center' // Centrar la tabla en la hoja
          }
        },
        {
          text: "", // Agregar espacio vertical entre el título y la tabla
          margin: [0, 10]
        },
        {
          table: {
            body: [
              ["Comentario"],
              [historia.datos.comentario]
            ],
            alignment: 'center' // Centrar la tabla en la hoja
          }
        },
        {
          text: "", // Agregar espacio vertical entre el título y la tabla
          margin: [0, 10]
        },
        {
          text: "Fecha de Emision: "+ new Date().toISOString(),
          style: 'titulo'
        },
      ],
      styles: {
        titulo: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10] // Agregar margen inferior al título
        },
        tableHeader: {
          bold: true,
          alignment: 'center'
        },
        tableContent: {
          alignment: 'center'
        }
      }
    };
  
    const pdf = pdfMake.createPdf(pdfDefinicion);
    pdf.open();
  }
  

  descargarExelUsuarios(datos:any)
  {
    this.workbook = new Workbook();

    this.workbook.creator = "Clinica Online";
    this.crearTablaExel(datos);

    this.workbook.xlsx.writeBuffer().then( (data:any)=>{
      const blob = new Blob([data]);
      fs.saveAs(blob, "usuarios.xlsx");
    });
  }

  private crearTablaExel(usuarios:any)
  {
    const sheet = this.workbook.addWorksheet("Usuarios");

    /*sheet.getColumn("A").width = 10;

    sheet.columns.forEach( (column)=>{
      column.alignment = { vertical:"middle", wrapText:true};
    });*/

    const headerRow = sheet.getRow(1);

    let claves = ["Nombre", "Apellido", "DNI", "Email", "Perfil"];
    headerRow.values = claves;

        for(let i=0;i<usuarios.length; i++)
        {
          console.log(usuarios[i]);
          const headerRowDatos = sheet.getRow(i+2);
          
          headerRowDatos.values = 
          [
            usuarios[i].datos.nombre, 
            usuarios[i].datos.apellido, 
            usuarios[i].datos.dni, 
            usuarios[i].datos.mail, 
            usuarios[i].perfil
          ];
        }
  }

  
}
