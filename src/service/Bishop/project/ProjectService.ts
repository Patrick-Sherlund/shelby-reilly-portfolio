import {axiosInstance} from "../AxiosInstance";
import {ProjectDto} from "../../models/project/ProjectDto";


export const getAllProjects = async (): Promise<ProjectDto[]> => {
    const response = await axiosInstance.get<ProjectDto[]>("/api/v1/projects");
    return response.data;
};

export const createProject = async (
    projectName: string,
    videoIds: number[]
): Promise<ProjectDto> => {

    const payload = {
        name: projectName,
        videoIds: videoIds,
    };

    const response = await axiosInstance.post<ProjectDto>(
        "/api/v1/projects",
        payload
    );
    return response.data;
};

export async function getProject(projectId: number): Promise<ProjectDto> {
    const url = `/api/v1/projects/${projectId}`;
    const response = await axiosInstance.get<ProjectDto>(url);
    return response.data;
}

export async function deleteProject(projectId: number): Promise<void> {
    const url = `/api/v1/projects/${projectId}`;
    await axiosInstance.delete(url);
}