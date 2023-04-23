<script>
import compoment from '@/components/draggable/NewContent/NewContentDefaultComponents/TopicCate/NewDTopicCatePreview'
export default {
  name: 'NewBaseCatePreview',
  extends: compoment,
  data () {
    return {
      markType: 5,
      options: [],
      placeholder: '根据所选项生成基础分类代码'
    }
  }
}
</script>
