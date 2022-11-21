export class FileLocal {

  acceptedFiles: acceptedFiles[] = [
    {
      kind: "Documentos",
      maxSize: 10,
      exts: [
        ".PDF",
        ".PPT",
        ".PPTX",
        ".XLS",
        ".XLSX",
        ".DOCX",
        ".RAR",
        ".ZIP",
        ".FLA",
        ".FLV",
        ".RTF",
        ".PUB",
        ".TXT",
      ],
      extsguia: [
        ".PDF",
        ".XLS",
        ".PPT",
        ".PPTX",
        ".XLSX",
        ".DOCX",
        ".TXT",
        ".ZIP",
        ".RAR",
      ],
    },
    {
      kind: "Video",
      maxSize: 25,
      exts: [".MP4", ".MPE3", ".MPEG", ".AVI", ".MOV"],
      extsguia: []
    },
    {
      kind: "Imagen",
      maxSize: 5,
      exts: [".PNG", ".JPG", ".GIF", ".JPEG"],
      extsguia: []
    },
  ];
  FileNotAllow: boolean = false;
  errorMessage: string = "";

  fileenabled: boolean; // si es archivo o es enlace
  otherinput;
  firstloadfile: boolean; // CArga un archivo o un enlace
  fileLoadedByDefault: boolean; // Si por defecto al cargar el formulario en edit lo
  // guardado es un archivo que venia por defeto

  namesfiles: string;

  constructor() {
    this.fileenabled = true;
    this.fileLoadedByDefault = true; // si lo que esta cargado cargado por defecto fue un archivo
    this.firstloadfile = false; // CArga un archivo o un enlace
    this.namesfiles = "";
  }

  inputfiles(input: HTMLInputElement) {
    input.addEventListener("change", (e) => {
      const otherinput: any = document.getElementById("link");
      otherinput.value = "";
      this.active("file");
      this.putnamefile();
      this.firstloadfile = false;
      this.FileNotAllow = false;
      this.fileLoadedByDefault = false;


      let kind = this.getExtension(input);
      if (kind != "Error de carga") {
        if (kind != undefined) {
          let state = this.reviewSize(input, kind.maxSize);
          if (state.state == false) {
            this.FileNotAllow = true;
            this.firstloadfile=false;
          this.errorMessage = state.error;
          this.namesfiles='';
          }else{
            this.acceptedfileAndproggresBar(e);
          }
        } else {
          this.FileNotAllow = true;
          this.firstloadfile=false;
          this.errorMessage = "El tipo de archivo no es permitido";
          this.namesfiles='';
        }
      }else{
        this.FileNotAllow = true;
          this.firstloadfile=false;
          this.errorMessage = "Ocurrió un error durante la carga, por favor intente de nuevo";
          this.namesfiles='';
      }
    });
  }

  getExtension(input: HTMLInputElement) : any{
    try {
      let extension = input.files[0].name.substring(
        input.files[0].name.lastIndexOf(".")
      );
      let kind: acceptedFiles[] = this.acceptedFiles.filter((k) =>
        k.exts.includes(extension.toUpperCase())
      );
      return kind[0];
    } catch (error) {
      return "Error de carga";
    }

  }
  active(id: string) {
    id === "link" ? (this.fileenabled = false) : (this.fileenabled = true);
  }
  putnamefile(){
    const htmlelement: any = document.getElementById("file");
    const archivo = htmlelement.value;
    const nombre = archivo.substring(
      archivo.lastIndexOf("\\") + 1,
      archivo.length
    );
    this.namesfiles = nombre;
  }
  inputlink() {
    document.querySelector(".cargarUrl").addEventListener("click", () => {
      this.namesfiles = "";
      const otherinput: any = document.getElementById("file");
      otherinput.value = "";
    });
    document.querySelector(".cargarUrl").addEventListener("change", (e) => {
      const otherinput: any = document.getElementById("file");
      otherinput.value = "";
      this.namesfiles = "";
      this.active("link");
      
      let inputValue: any = e.target;
      if (inputValue.value.length == 0) {
        this.firstloadfile = false
        this.fileLoadedByDefault = false;

      } else {
        this.firstloadfile = true
      }

    });
  }
  acceptedfileAndproggresBar(e){
    let file :any=  e.target;
          file =  file.files[0];
          const filereader = new FileReader()
          const root = document.documentElement;
          let ProgressBar=document.getElementById("progress-Bar");
          let ProgressBarNum=document.getElementById("progress-Bar-number");
          filereader.readAsDataURL(file);
          filereader.addEventListener('progress',(e)=>{
            ProgressBar.classList.remove("hidden");
            let value =Math.round(e.loaded*100 / e.total) + "%";
            root.style.setProperty('--progresBar',value);
            ProgressBarNum.innerText=value;
          });
          filereader.addEventListener("abort", (e) => {
            this.firstloadfile = false;
          });
          filereader.addEventListener('loadend',(e)=>{
            this.firstloadfile = true;   
            root.style.setProperty('--progresBar','100%');
            setTimeout(() => {
              ProgressBar.classList.add("hidden");
              root.style.setProperty('--progresBar',"0%");
              ProgressBarNum.innerText="";
            }, 3000);
          });
  }
  reviewSize(input: HTMLInputElement, Tamaño_en_MB: number) {
    if (input.files.length <= 0)
      return {
        state: false,
        error: `no se cargó archivo`,
      };
    const archivo = input.files[0];
    if (archivo.size/(1024*1024) > Tamaño_en_MB) {
      const tamanioEnMb = Tamaño_en_MB;
      input.value = "";
      return {
        state: false,
        error: `El tamaño máximo es ${Tamaño_en_MB} MB `,
      };
    }
    return {
      state: true,
      error: null,
    };
  }

  eliminarArchivo(id: string) {
    const logicinput: any = document.getElementById(id);
    this.namesfiles = "";
    logicinput.value = "";
    this.firstloadfile = false;
  }
}

class acceptedFiles {
  kind: string;
  maxSize: number;
  exts: Array<string>;
  extsguia: Array<string>;
}