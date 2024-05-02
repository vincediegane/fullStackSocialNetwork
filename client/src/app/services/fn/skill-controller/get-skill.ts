/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SkillDto } from '../../models/skill-dto';

export interface GetSkill$Params {
  skillId: number;
}

export function getSkill(http: HttpClient, rootUrl: string, params: GetSkill$Params, context?: HttpContext): Observable<StrictHttpResponse<SkillDto>> {
  const rb = new RequestBuilder(rootUrl, getSkill.PATH, 'get');
  if (params) {
    rb.path('skillId', params.skillId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SkillDto>;
    })
  );
}

getSkill.PATH = '/api/v1/skills/{skillId}';
