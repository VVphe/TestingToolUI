<template>
  <div id="TestingPage">
    <input id="upload-cases" type="file" multiple="multiple"  @change="importFile" class="dz-hidden-input" style="visibility: hidden; position: absolute; top: 0px; left: 0px; height: 0px; width: 0px;">
    <div style="display: inline; margin: 20px">
      <i class="fa fa-circle" :class="{'text-navy': selectFile !== ''}"></i>
      <strong>Class:</strong>
      <el-select v-model="selectFile" clearable placeholder="Empty" @change="fileSelectChange">
          <el-option
              v-for="file in files"
              :key="file.name"
              :label="file.name"
              :value="file.name">
          </el-option>
      </el-select>
    </div>

    <div style="display: inline; margin: 20px">
      <i class="fa fa-circle" :class="{'text-navy': selectMethod !== ''}"></i>
      <strong>Method:</strong>
      <el-select v-model="selectMethod" clearable placeholder="Empty" @change="methodSelectChange">
          <el-option
              v-for="method in myMethods"
              :key="method"
              :label="method"
              :value="method">
          </el-option>
      </el-select>
    </div>

    <div style="display: inline; margin: 20px">
      <i class="fa fa-circle" :class="{'text-navy': selectArgs !== ''}"></i>
      <strong>Arguments:</strong>
      <el-select v-model="selectArgs" clearable placeholder="Empty" @change="ArgsSelectChange">
          <el-option
              v-for="arg in myArguments"
              :key="arg.join(',')"
              :label="arg.join(',')"
              :value="arg">
          </el-option>
      </el-select>
    </div>

    <div style="display: inline; margin: 15px">
      <button class="btn btn-primary  dim" type="button" style="margin-top: 10px" @click="selectCases"><i class="fa fa-upload"></i></button>
      <strong>{{chooseTip}}</strong>
    </div>

    <div style="position: absolute; bottom:50px; right: 20px">
      <button type="button" class="btn btn-primary btn-lg" @click="startTesting">Start testing</button>
    </div>

    <div class="col-lg-14" v-show="isRendered"> 
      <div class="tabs-container">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#table"> Table</a></li>
                            <li class="" @click="drawChart"><a data-toggle="tab" href="#report">Report</a></li>
                        </ul>
                        <div class="tab-content">
                            <div id="table" class="tab-pane active">
                                <div class="panel-body">
                                  <div class="ibox-content">

          <div class="jqGrid_wrapper">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_table_list_1" dir="ltr" style="width: 1130px;">
              <div class="ui-widget-overlay jqgrid-overlay" id="lui_table_list_1"></div>
              <div class="loading ui-state-default ui-state-active" id="load_table_list_1" style="display: none;">Loading...</div>
              <div class="ui-jqgrid-view" id="gview_table_list_1" style="width: 1130px;">
                <div class="ui-jqgrid-titlebar ui-jqgrid-caption ui-widget-header ui-corner-top ui-helper-clearfix">
                  <span class="ui-jqgrid-title">Test Result</span>
                </div>

                <div class="ui-state-default ui-jqgrid-hdiv" style="width: 1130px;">
                  <div class="ui-jqgrid-hbox">
                    <table class="ui-jqgrid-htable" style="width: 1112px;" role="grid" aria-labelledby="gbox_table_list_1" cellspacing="0" cellpadding="0" border="0">
                      <thead>
                      <tr class="ui-jqgrid-labels" role="rowheader">

                        <th id="table_list_1_id" role="columnheader" class="ui-state-default ui-th-column ui-th-ltr" style="width: 104px;" v-for="col in tableCols">
                          <span class="ui-jqgrid-resize ui-jqgrid-resize-ltr" style="cursor: col-resize;">&nbsp;</span>
                          <div id="jqgh_table_list_1_id" class="ui-jqgrid-sortable">{{col}}
                            <span class="s-ico" style="">
                              <span sort="asc" class="ui-grid-ico-sort ui-icon-asc ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span>
                              <span sort="desc" class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span>
                            </span>
                          </div>
                        </th>

                      </tr>
                      </thead>
                    </table>
                  </div>
                </div>
                <div class="ui-jqgrid-bdiv" style="height: 400px; width: 1130px;">
                  <div style="position:relative;">
                    <div></div>
                  <table id="table_list_1" tabindex="0" cellspacing="0" cellpadding="0" border="0" role="grid" aria-multiselectable="false" aria-labelledby="gbox_table_list_1" class="ui-jqgrid-btable" style="width: 1112px;">
                    <tbody>

                    <tr role="row" id="1" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" v-for="row in tableRows">
                      <td role="gridcell"  :class="{'correct': value == 'true', 'incorrect': value == 'false'}" style="text-align: center;" title="1" aria-describedby="table_list_1_id" v-for="value in row">{{value}}</td>
                    </tr>

                    </tbody>
                  </table>
                </div>
                </div>
                </div>
              <div class="ui-jqgrid-resize-mark" id="rs_mtable_list_1">&nbsp;</div>
            </div>



          </div>

        </div>
                                </div>
                            </div>
                            <div id="report" class="tab-pane" >
                              <div class="panel-body">
                                <div style="float:left; width: 49%">
                                  <eChart :options="pieOption"></eChart>
                                </div>
                                <div style="float:right; width: 49%">
                                  <h3 style="padding-top: 30px">The correct num of testing results is: {{correctNum}}</h3>
                                  <br>
                                  <h3 >The incorrect num of testing results is: {{incorrectNum}}</h3>
                                  <br>
                                  <h3 >The percentage of correct results is: {{percentage}}</h3>
                                </div>
                              </div>
                            </div>
                            </div>
                        </div>


                    </div>
    </div>

         <!-- <div class="ibox-content" v-show="isRendered">

          <div class="jqGrid_wrapper">
            <div class="ui-jqgrid ui-widget ui-widget-content ui-corner-all" id="gbox_table_list_1" dir="ltr" style="width: 1130px;">
              <div class="ui-widget-overlay jqgrid-overlay" id="lui_table_list_1"></div>
              <div class="loading ui-state-default ui-state-active" id="load_table_list_1" style="display: none;">Loading...</div>
              <div class="ui-jqgrid-view" id="gview_table_list_1" style="width: 1130px;">
                <div class="ui-jqgrid-titlebar ui-jqgrid-caption ui-widget-header ui-corner-top ui-helper-clearfix">
                  <span class="ui-jqgrid-title">Test Result</span>
                </div>

                <div class="ui-state-default ui-jqgrid-hdiv" style="width: 1130px;">
                  <div class="ui-jqgrid-hbox">
                    <table class="ui-jqgrid-htable" style="width: 1112px;" role="grid" aria-labelledby="gbox_table_list_1" cellspacing="0" cellpadding="0" border="0">
                      <thead>
                      <tr class="ui-jqgrid-labels" role="rowheader">

                        <th id="table_list_1_id" role="columnheader" class="ui-state-default ui-th-column ui-th-ltr" style="width: 104px;" v-for="col in tableCols">
                          <span class="ui-jqgrid-resize ui-jqgrid-resize-ltr" style="cursor: col-resize;">&nbsp;</span>
                          <div id="jqgh_table_list_1_id" class="ui-jqgrid-sortable">{{col}}
                            <span class="s-ico" style="">
                              <span sort="asc" class="ui-grid-ico-sort ui-icon-asc ui-icon ui-icon-triangle-1-n ui-sort-ltr"></span>
                              <span sort="desc" class="ui-grid-ico-sort ui-icon-desc ui-state-disabled ui-icon ui-icon-triangle-1-s ui-sort-ltr"></span>
                            </span>
                          </div>
                        </th>

                      </tr>
                      </thead>
                    </table>
                  </div>
                </div>
                <div class="ui-jqgrid-bdiv" style="height: 450px; width: 1130px;">
                  <div style="position:relative;">
                    <div></div>
                  <table id="table_list_1" tabindex="0" cellspacing="0" cellpadding="0" border="0" role="grid" aria-multiselectable="false" aria-labelledby="gbox_table_list_1" class="ui-jqgrid-btable" style="width: 1112px;">
                    <tbody>

                    <tr role="row" id="1" tabindex="-1" class="ui-widget-content jqgrow ui-row-ltr" v-for="row in tableRows">
                      <td role="gridcell"  :class="{'correct': value == 'true', 'incorrect': value == 'false'}" style="text-align: center;" title="1" aria-describedby="table_list_1_id" v-for="value in row">{{value}}</td>
                    </tr>

                    </tbody>
                  </table>
                </div>
                </div>
                </div>
              <div class="ui-jqgrid-resize-mark" id="rs_mtable_list_1">&nbsp;</div>
            </div>



          </div>

        </div> -->
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: "TestingPage",
  data() {
    return {
      files: [],
      myMethods: [],
      myArguments: [],

      selectFile: [],
      selectMethod: [],
      selectArgs: [],
      
      caseFile: "",
      chooseTip:"Choose your test case file!",
      fileData: [],

      tableCols: [],
      tableRows: [],
      isRendered: false,

      correctNum: 0,
      incorrectNum: 0,
      percentage: 0,
      pieOption: {}
    }
  },
  methods: {
    fileSelectChange: function(data) {
      this.resetTable()
      this.$http.get('http://localhost:8080/methods')
        .then(function(res) {
          //console.log(res.body)
          this.myMethods = res.body
          console.log(this.myMethods)
        }, function(err) {
          console.log(err)
        })
    },
    methodSelectChange: function(data) {
      this.resetTable()
      this.$http.get('http://localhost:8080/arguments', { params: {methodName: data} })
        .then(function(res) {
          console.log(res.body)
          this.myArguments = res.body
          console.log(this.myArguments)
        }, function(err) {
          console.log(err)
        })
    },
    ArgsSelectChange: function(data) {
      this.resetTable()
    },

    importFile: function(e) {
      this.resetTable()
      this.caseFile = e.target.files[0]
      let f = this.caseFile
      this.chooseTip = f.name + " chosed!"
      let $t = this
      var reader = new FileReader()

      reader.onload = function(e) {
        var data = e.target.result;
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {
            type: "base64"
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: "binary"
          })
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);
        $t.fileData = json
        //$t.dealFile($t.analyzeData(json)); 
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    selectCases: function() {
      document.getElementById('upload-cases').click()
    },
    startTesting: function() {
      this.tableRows = []
      this.tableCols = []
      this.correctNum = 0
      this.incorrectNum = 0
      this.percentage = 0
      this.isRendered = true
      let $ = this

      let ks = Object.keys(this.fileData[0])
      for(let i = 0; i < ks.length - 1; i ++) {
        this.tableCols.push('Argument' + (i + 1) )
      }
      this.tableCols.push('Expect Result')
      this.tableCols.push('Result')
      this.tableCols.push('Correct?')

      this.fileData.forEach(element => {
        let keys = Object.keys(element)
        var myArgs = []
        var rowValue = []
        for(let index = 0; index < keys.length - 1; index ++) {
          let key = keys[index]
          myArgs.push(element[key])
          rowValue.push(element[key])
        }
        rowValue.push(element[keys[keys.length - 1]])

        let selectMethod = $.selectMethod
        let selectArgs = $.selectArgs

        var formData = new FormData()
        formData.append('methodName', selectMethod)
        formData.append('args', myArgs)
        formData.append('argsTypes', selectArgs)
        $.$http.post('http://localhost:8080/testing', formData).then(function(res) {
          console.log(res)
          rowValue.push(res.body)
          if(res.body == element[keys[keys.length - 1]]) {
            rowValue.push("true")
            $.correctNum ++;
          } else {
            rowValue.push("false")
            $.incorrectNum ++;
          }
          $.tableRows.push(rowValue)
          $.percentage = Number(($.correctNum / ($.correctNum + $.incorrectNum)) * 100).toFixed(2) + '%'
        }, function(err) {
          console.log(err)
        })
      })
    },
    resetTable: function() {
      this.tableCols = []
      this.tableRows = []
      this.isRendered = false,

      this.correctNum = 0
      this.incorrectNum = 0
      this.percentage = 0
    },
    drawChart: function() {
      let correctNum = this.correctNum
      let incorrectNum = this.incorrectNum
      this.percentage = Number((correctNum / (correctNum + incorrectNum)) * 100).toFixed(2) + '%'
      this.pieOption = {
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ['#18a689', '#ed5565'],
        series: [
          {
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: [
              {value: correctNum, name: 'correct'},
              {value: incorrectNum, name: 'incorrect'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.files = this.$route.params.files
    console.log(this.$route.params)
  }
}
</script>

<style scoped>
.correct {
  color: #16987e
}
.incorrect {
  color: chocolate
}
</style>
