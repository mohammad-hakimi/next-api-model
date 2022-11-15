import BaseModels, { BaseModelFields } from "../base/models";
import camerasApi from "./camerasApi";
import { AxiosResponse } from "axios";

export interface CameraFields extends BaseModelFields {
  name: string;
  model: string;
  status: boolean;
  description: string;
  ip: string;
  port: string;
  channel_id?: string | null;
  motion_detection_enabled: boolean;
  username: string;
  password: string;
  frame_rate: number;
  group?: string | null;
  user?: number;
  timezone: string;
  record_timestamp: boolean;
  group_title?: string | null;
}

export class Camera extends BaseModels.BaseModel<CameraFields> {
  readonly model = "cameras.camera";
  fields!: CameraFields;

  static async getUserCameraList(): Promise<Camera[]> {
    const cameras: Camera[] = (await camerasApi.get<Camera[]>("/list/")).data;
    return await Promise.all(cameras.map(async (camera) => new Camera(camera)));
  }

  static async getUserEnabledCameraList(): Promise<Camera[]> {
    const cameras: Camera[] = (
      await camerasApi.get<Camera[]>("/list/?status=true")
    ).data;
    return await Promise.all(cameras.map(async (camera) => new Camera(camera)));
  }

  static async getCameraInfo(cameraID: string): Promise<Camera> {
    return new Camera(
      (await camerasApi.get<Camera>(`/info/${cameraID}/`)).data
    );
  }

  async save(): Promise<{ status: number; data: Camera }> {
    const res =
      this.pk.length > 0
        ? await camerasApi.put(`/edit/${this.pk}/`, {
            ...this.fields
          })
        : await camerasApi.post("/add/", this.fields);

    return {
      status: res.status,
      data: new Camera(res.data)
    };
  }

  async delete(): Promise<AxiosResponse<string>> {
    return await camerasApi.delete(`/delete/${this.pk}/`);
  }
}
