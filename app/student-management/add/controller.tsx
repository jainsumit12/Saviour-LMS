import { ApiUrl } from "@/config/api/apiUrls";
import httpRequest from "@/config/api/AxiosInterseptor";

export class StudentController {
  async addStudent(payload: any) {
    const data = await httpRequest.post(ApiUrl.ADD_STUDENT, payload);
    return data.data;
  }
}
