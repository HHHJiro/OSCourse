<template>
  <div id="gctn">
    <div class="gctn-inner">
      <div class="tit cour-desc">
        <img src="/static/img/atl_ttl.png" alt=""> <span class="tit-text">课程概述</span>
      </div>
      <div class="course-desc">
        <ul class="desc-ul">
          <li>
            <el-tag type="success">简介</el-tag>
            <p>
            《操作系统》是一门核心课程,是计算机相关专业的专业必修课程。本课程首先介绍了操作系统的发展、特征、功能以及OS结构；接着深入地阐述了进程和线程的基本概念、同步与通信、调度与死锁；然后对连续和离散存储器管理方式及虚拟存储器进行了设备管理进行了介绍；最后分别阐述了文件管理和用户接口相关内容。理论内容可以概括为引言、进程管理、存储管理、设备管理、文件管理、用户接口等几部分，实验内容主要由Linux系统的安装、Linux 系统的基本操作、Linux系统的进程管理、Linux系统的存储管理、Linux下C编程等五个实验组成。
          </p>
        </li>
        <li>
          <el-tag type="primary">课程目标</el-tag>
          <p>
            学习本课程，使学生了解操作系统的基本概念、功能、分类和发展历史，掌握操作系统的使用操作方法，掌握进程和线程的管理技术，掌握处理机的管理和调度策略，掌握存储管理系统、文件系统和设备管理技术，在此基础上结合Linux的进程和存储管理与文件系统进行深入学习与分析，掌握目前主流操作系统，如Linux操作系统的基本原理和功能以及特点。使学生比较清楚地了解现在主流操作系统的一般面貌和内部结构，为进一步学习软、硬件技术及移植、修改、设计和使用系统打下良好的理论基础。
          </p>
        </li>
        <li>
          <el-tag type="warning">课程特色</el-tag>
          <p>
            本课程以Linux内核为重点，以基于Linux的操作系统课程网络实验环境为支撑，开设多层次的Linux主题实验，培养学生的系统分析和创新实践能力，教学效果显著；以“操作系统”为核心，形成多层次的系列课程。以本科“操作系统”为主干，形成多层次、多类型的课程体系，系列课程与实验相互配套，因材施教，取得良好的教学效果。
          </p>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang="sass">
  .tit
    height: 36px
    display: flex
    align-items: stretch
    margin: 0 20px 10px
    padding:
      bottom: 5px
    border:
      bottom: 1px solid #eee
    img
      height: 36px
      margin:
        right: 15px
    .tit-text
      font-size: 18px
      height: 36px
      line-height: 36px
  .course-desc
    margin: 0 20px
    padding:
      bottom: 20px
    overflow: hidden
    .desc-ul
      display: flex
      justify-content: space-around
      align-items: stretch
      li
        width: 300px
        border: 1px solid #1296db
        border-radius: 8px
        1px solid #eee
        overflow: hidden
        p
          text-indent: 2rem
          font-size: 14px
          line-height: 1.5
          padding: 10px 15px
</style>
