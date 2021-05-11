const Graph = require('@dagrejs/graphlib').Graph;
const uniq = require('lodash/uniq');
const forEach = require('lodash/forEach');
export default class AdjacencyMatrixGraph{
  constructor(){
    this.graph = new Graph();
  }
  //设置节点
  setNodes(nodes){
    this.graph.setNodes(nodes);
  }
  setNode(node){
    this.graph.setNode(node);
  }
  //设置边
  setEdge(source,target){
    this.graph.setEdge(source,target);
  }
  //返回指定节点的所有前置节点
  allPredecessors(targetNode){
    let allPreNodes = [];
    let graph = this.graph;
    function recursivePreNode(node) {
      var nodes = graph.predecessors(node);
      if(nodes == undefined || nodes.length == 0){
        return;
      }
      forEach(nodes,function(n){
        allPreNodes.push(n);
        recursivePreNode(n);
      });
    }
    recursivePreNode(targetNode);
    return uniq(allPreNodes);
  }
}