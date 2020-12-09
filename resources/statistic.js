/**
* 自动统计issue comment中包含checkbox的第一行信息
*/
(function () {
  // comment统计开始位置
  var staticIndex = 1;

  /**
   * statistic
   */
  function statistic () {
    var commentElems = document.getElementsByClassName('js-task-list-container');
    var textContent = '';
    var index = 1; //自动生成的缺陷序号，1、2、3......

    for (var i = staticIndex; i < commentElems.length; i++) {
      var $checkbox = commentElems[i].getElementsByClassName('task-list-item-checkbox')[0]
      if (!$checkbox) {
        continue
      }
      var isChecked = $checkbox.checked
      // 取第一行文字
      var text = $checkbox.parentNode.textContent.replace(/^\n*/, '').split('\n')[0]
      var href = $checkbox.closest('.timeline-content').getElementsByClassName('note-timestamp')[0].href
      var $href = `<a href='${href}'>${text}</a>`
      textContent += ` - [${isChecked ? 'x' : ' '}] ${index++}. ${$href} \n`
    }
    saveContent(textContent)
    console.log(`统计完成，总条数：${index - 1}！`)
  }

  function saveContent (content) {
    var $editButton = document.getElementsByClassName('js-issuable-edit')[0]
    $editButton.click()
    setTimeout(() => {
      var $textarea = document.getElementById('issue-description')
      if ($textarea && $textarea.value.indexOf('自动统计') !== -1) {
        var preValue = $textarea.value.substring(0, $textarea.value.indexOf('自动统计') + 4)
        $textarea.value = `${preValue} \n ${content}`
        $textarea.dispatchEvent(new Event("input", {
          bubbles: true,
          cancelable: true
        }));
        var $saveButton = document.getElementsByClassName('qa-save-button')[0]
        $saveButton.click()
      }
    }, 0)
  }

  statistic();
})();
