import { Base } from "../../utils/base.js";
class Label extends Base {
  constructor() {
    super()
  }
  labelList(sex) {
    var labList
    if (sex == 1) {
      labList = [
        { name: '风趣幽默' },
        { name: '小鲜肉' },
        { name: '人很Nice' },
        { name: '外冷内热' },
        { name: '文艺青年' },
        { name: '高富帅' },
        { name: '霸道总裁' },
        { name: '游戏宅' },
        { name: '阳光暖男' },
        { name: '心机Boy' },
        { name: '小清新' },
        { name: '星座达人' },
        { name: '老司机' },
        { name: '段子手' },
        { name: '污妖王' },
        { name: '音乐迷' },
        { name: '活好' },
        { name: '大脑洞' },
        { name: '闷骚' },
        { name: '数码控' },
        { name: '颜值担当' },
        { name: '双商高' },
        { name: '会拍照' },
        { name: '摇滚迷' },
        { name: '宠物奴' },
        { name: '讲义气' },
        { name: '学霸' },
        { name: '声控' },
        { name: '健身狂' },
      ]
    } else {
      labList = [
        { name: '外冷内热' },
        { name: '白富美' },
        { name: '心灵手巧' },
        { name: '大脑洞' },
        { name: '小可爱' },
        { name: '性感Diva' },
        { name: '选择困难症' },
        { name: '小公举' },
        { name: '女王范儿' },
        { name: '女汉纸' },
        { name: '宅女' },
        { name: '气质佳' },
        { name: '傻白甜' },
        { name: '心机Girl' },
        { name: '少女心爆炸' },
        { name: '爱穿搭' },
        { name: '爱穿搭' },
        { name: '高贵冷艳' },
        { name: '大长腿' },
        { name: '无辣不欢' },
        { name: '二次元' },
        { name: '厨艺高' },
        { name: '伪文青' },
        { name: '自来熟' },
        { name: '有品位' },
        { name: '小纯洁' },
        { name: '咖啡控' },
        { name: '颜值担当' },
        { name: '强迫症' },
        { name: '吃货' },
        { name: '星座达人' },
      ]
    }
    return labList

  }
  getLabelList(param, callBack) {
    var params = {
      url: 'impress_tag/get_impress_tag_list',
      type: 'POST',
      data: param,
      eCallback: res => {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  choiceLabel(param,callBack){
    var params = {
      url: 'impress_tag/good_impress_tag',
      type: 'POST',
      data: param,
      eCallback: res => {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  creatLabel(param,callBack){
    var params = {
      url: 'impress_tag/add_tag',
      type: 'POST',
      data: param,
      eCallback: res => {
        callBack && callBack(res)
      }
    }
    this.request(params)
  }
  labelInfo(param,callBack){
      var params={
        url: "impress_tag/good_impress_list",
        type:"POST",
        data:param,
        eCallback:function(res){
          callBack && callBack(res)
        }
      }
      this.request(params);
  }
}

export { Label }