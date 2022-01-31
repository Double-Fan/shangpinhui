import Mock from "mockjs";
// webpack默认暴露：JSON、图片
import banner from "@/mock/banner";
import floor from "@/mock/floor";

//参数一：请求地址；参数二：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
