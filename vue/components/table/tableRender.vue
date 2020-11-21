
<script>
export default {
  props: {
    options: Array,
    tableMaxHeight: [Number, String],
    rowKey: () => {},
    data: {
      type: Array,
      defalut: () => {
        return []
      },
    },
    edit: Boolean,
    operate: {
      type: [Object, Boolean],
    },
    cellStyle: {
      type: [Function, String],
    },
  },
  render: function (createElement) {
    let vm = this
    let deepDomCreate = (arr) => {
      
      return arr.map((item, index) => {
        return createElement(
          'el-table-column',
          {
            props: {
              label: item.label,
              key: index,
              align: 'center',
              minWidth: item.width || 140,
              fixed: item.fixed,
            },
            scopedSlots: {
              defalut: (scope) => {
                if (vm.edit) {
                  return createElement('el-input', {
                    class: ['edit-input'],
                    props: {
                      value: vm['data'][scope.$index][item.prop],
                    },
                    on: {
                      input: function (event) {
                        if (
                          typeof vm['data'][scope.$index][item.prop] ===
                          'string'
                        ) {
                          vm['data'][scope.$index][item.prop] = event
                        }
                      },
                    },
                    attrs: {
                      placeholder: '请输入',
                    },
                  })
                } else if (item.slot) {
                  if (!this.$scopedSlots[item.slot]) return
                  return createElement('div', [
                    this.$scopedSlots[item.slot]({
                      $index: scope.$index,
                      row: scope.row,
                      column: scope.column,
                      prop: item.prop || '',
                    }),
                  ])
                } else {
                  return createElement(
                    'span',
                    item.format && scope.column
                      ? item.format(
                          scope.row,
                          scope.column,
                          scope.row[item.prop],
                          scope.$index
                        )
                      : scope.row[item.prop] || '_'
                  )
                }
              },
            },
          },
          item.children instanceof Array ? deepDomCreate(item.children) : []
        )
      })
    }
    return createElement(
      'el-table',
      {
        class: {
          'table-mul': true,
          'table-mul-fixed': vm.operate || false,
        },
        style: {
          width: '100%',
        },
        props: {
          data: vm.data,
          border: true,
          'row-key': vm.rowKey,
          'max-height': vm.tableMaxHeight < 500 ? 500 : vm.tableMaxHeight,
          'cell-style': vm.cellStyle,
        },
        on: {
          'selection-change': () => {},
        },
        ref: 'eltable',
      },
      [
        deepDomCreate(vm.options),
        vm.operate
          ? createElement('el-table-column', {
              props: {
                lable: vm.operate.label || 操作,
                width: vm.operate.width || 100,
                key: 'caol',
                align: 'center',
                fixed: 'right',
              },
              scopedSlots: {
                defalut: (scope) => {
                  return createElement('div', [
                    this.$scopedSlots['operate']({
                      $index: scope.$index,
                      row: scope.row,
                    }),
                  ])
                },
              },
            })
          : null,
      ]
    )
  },
}
</script>
<style lang='less' scoped>
.table-mul{
  /deep/.edit-input{
    background: transparent;
    input{
      border:none;
      text-align: center;
      background: transparent; 
    }
  }
  /deep/thead{
    color:#333;
  }
  // /deep/ th.gutter{
  //   border：none;
  // }
  /deep/thead.is-group th{
    background: #f5f5f5;
  }
}
.table-mul-fixed{
  /deep/th:last-child{
   border-left:1px #ebeef5 solid;
   border-right:none;
  }
  /deep/.el-table_fixed-right-patch{
    background-color:#f5f5f5 ;
  }
}
</style>