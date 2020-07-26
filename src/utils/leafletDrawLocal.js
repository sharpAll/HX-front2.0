const localObj = {
  draw: {
    toolbar: {
      actions: {
        title: "取消绘制",
        text: "取消"
      },
      finish: {
        title: "完成绘制",
        text: "完成"
      },
      undo: {
        title: "撤销至上一步",
        text: "撤销"
      },
      buttons: {
        polyline: "绘制线段",
        polygon: "绘制多边形",
        rectangle: "绘制矩形",
        circle: "绘制圆形",
        marker: "添加标记",
        circlemarker: "添加圆形标记"
      }
    },
    handlers: {
      circle: {
        tooltip: {
          start: "点击后拖拽绘制圆形"
        },
        radius: "半径"
      },
      circlemarker: {
        tooltip: {
          start: "点击放置圆形标记"
        }
      },
      marker: {
        tooltip: {
          start: "点击放置标记"
        }
      },
      polygon: {
        tooltip: {
          start: "单击开始绘制",
          cont: "单击继续绘制",
          end: "单击起始点结束绘制"
        }
      },
      polyline: {
        error: "<strong>Error:</strong> shape edges cannot cross!",
        tooltip: {
          start: "单击开始绘制",
          cont: "单击继续绘制",
          end: "单击最后一个点结束绘制"
        }
      },
      rectangle: {
        tooltip: {
          start: "点击后拖拽绘制矩形"
        }
      },
      simpleshape: {
        tooltip: {
          end: "Release mouse to finish drawing."
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: "保存更改",
          text: "保存"
        },
        cancel: {
          title: "还原所有",
          text: "还原"
        },
        clearAll: {
          title: "清除所有",
          text: "清除所有"
        }
      },
      buttons: {
        edit: "编辑图层",
        editDisabled: "没有图层可编辑",
        remove: "删除图层",
        removeDisabled: "没有图层可删除"
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: "拖动节点改变图形",
          subtext: "点击取消撤销改动"
        }
      },
      remove: {
        tooltip: {
          text: "点击清除某个图形"
        }
      }
    }
  }
};
export default localObj;
