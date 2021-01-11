import $http from '@/plugins/axios';

// 查询项目接口
export const getProjectList = () => $http.get('/project');

// 文件上传接口
export const uploadUrl = (params: object) =>
  $http.post('/group1/upload', params);

// 部署接口
export const buildImage = (params: object) => $http.post('/build', params);

// 新增项目接口
export const addProject = (params: object) => $http.post('/project', params);

// 删除项目接口
export const delProject = (id: string) => $http.delete(`/project/${id}`);

// 获取历史版本
export const getTagHistory = (id: string) => $http.get(`/build/history/${id}`);
