<template>
<div class="wrapper wrapper-content animated fadeIn">
  
            <div class="row">
                <div class="col-lg-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-title">
                        <h5>Dropzone Area</h5>
                        <div class="ibox-tools">
                            <a class="collapse-link">
                                <i class="fa fa-chevron-up"></i>
                            </a>
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-user">
                                <li><a href="#">Config option 1</a>
                                </li>
                                <li><a href="#">Config option 2</a>
                                </li>
                            </ul>
                            <a class="close-link">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <div class="ibox-content">
                      <input id="upload-input" type="file" multiple="multiple"  @change="getFile" class="dz-hidden-input" style="visibility: hidden; position: absolute; top: 0px; left: 0px; height: 0px; width: 0px;">
                        <div ref="dropzone" id="my-awesome-dropzone" class="dropzone dz-clickable" @click="selectFile">
                            <div class="dropzone-previews"></div>
                            <button type="submit" class="btn btn-primary pull-right" @click.stop="goTesting">Start testing!</button>
                            <div v-if="noFiles" class="dz-default dz-message"><span>Drop files here to upload</span></div>
                            <div v-for="(item, index) in fileItem" class="dz-preview dz-file-preview" @click.stop="">  
                              <div class="dz-details">    
                                <div class="dz-filename"><span data-dz-name="">{{item.name}}</span></div>    
                                <div class="progress progress-mini" style="margin-top:10px; ">
                                  <div  :style="{width: item.uploadPercentage + '%'}" class="progress-bar" :class="{'progress-bar-danger': item.isError}"></div>
                                </div>
                              </div>  
                              <div style="position: absolute; top: 0px; right:0px;" @click.stop="deleteFile(index)"><span style="cursor: pointer;">✘</span></div>  
                            </div>
                        </div>
                        
                        <div>
                            <div class="m text-right"><small>DropzoneJS is an open source library that provides drag'n'drop file uploads with image previews: <a href="https://github.com/enyo/dropzone" target="_blank">https://github.com/enyo/dropzone</a></small> </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            </div>
</template>

<script>
export default {
  name: "UploadPage",
  data() {
    return {
      fullscreenLoading: false, 
      imFile: "",
      excelData: [],

      file: [],
      fileItem: [],
      noFiles: true
    };
  },
  methods: {
    importFile: function() {
      this.fullscreenLoading = true;
      let obj = this.imFile;
      if (!obj.files) {
        this.fullscreenLoading = false;
        return;
      }

      var f = obj.files[0];
      var reader = new FileReader();
      let $t = this;

      reader.onload = function(e) {
        var data = e.target.result;
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {
            type: "base64"
          });
        } else {
          $t.wb = XLSX.read(data, {
            type: "binary"
          });
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);
        console.log(json[1]);
        console.log(typeof json);
        $t.dealFile($t.analyzeData(json)); 
      };
      if (this.rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    analyzeData: function(data) {
      return data;
    },
    dealFile: function(data) {
      this.imFile.value = "";
      this.fullscreenLoading = false;
      if (data.length <= 0) {
        this.errorDialog = true;
        this.errorMsg = "请导入正确信息";
      } else {
        this.excelData = data;
      }
    },
    startTest: function() {
      if(this.excelData == null){
        this.errorDialog = true;
        this.errorMsg = "请导入正确信息";
      } else {
        let $s = this;
        this.excelData.forEach(element => {
         $s.$http.get("/course/bounder",{x:1,y:2})
            .then(function(res) {
              console.log(res);
            })
        });
      }
    },

    getFile: function($event) {
      // this.file.push($event.target.files[0])
      // this.fileItem.push({
      //   name: $event.target.files[0].name,
      //   uploadPercentage: 0
      // })
      this.uploadFile($event.target.files[0])
      this.noFiles = false
    },
    selectFile: function() {
      document.getElementById('upload-input').click()
    },
    deleteFile: function(index) {
      this.file.splice(index, 1)
      this.fileItem.splice(index, 1)
      if(this.file.length === 0) {
        this.noFiles = true
      }
    },
    goTesting: function() {
      var $ = this
      this.$router.push({name: 'TestingPage', params: {files: $.fileItem}})
    },
    uploadFile: function(file) {
      this.file.push(file)
      var item = {
        name: file.name,
        uploadPercentage: 0,
        isError:false
      }
      this.fileItem.push(item)
      var formDate = new FormData()
      formDate.append('file', file)
      this.$http.post('http://localhost:8080/uploadFile', formDate, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              progress: function(e) {
                item.uploadPercentage = Math.round((e.loaded * 100) / e.total);
              }
            }).then(function(res) {
                console.log(res)
                toastr.success(item.name + ' upload success')
              }, function(err) {
                console.log(err)
                item.isError = true
                toastr.error(item.name + ' upload failed')
              })
    },
    onDrag: function(e) {
      e.stopPropagation()
      e.preventDefault()
    },
    onDrop: function(e) {
      e.stopPropagation()
      e.preventDefault()
      var dt = e.dataTransfer
      // for (var i = 0; i !== dt.files.length; i++) {
      //       console.log(dt.files[i]);
      //   }

      // this.file.push(dt.files[0])
      // this.fileItem.push({
      //   name: dt.files[0].name,
      //   uploadPercentage: 0
      // })
      this.uploadFile(dt.files[0])
      this.noFiles = false
    }
  },
  mounted() {
    this.imFile = document.getElementById('imFile')
    var dropbox = this.$refs.dropzone
    dropbox.addEventListener('dragenter', this.onDrag, false)
    dropbox.addEventListener('dragover', this.onDrag, false)
    dropbox.addEventListener('drop', this.onDrop, false)
  }
};
</script>

<style scoped>
.align_center {
  position:fixed;
  left:50%;
  top:50%;
  margin-left:width/2;
  margin-top:height/2; 
  text-align:center;
}
</style>
