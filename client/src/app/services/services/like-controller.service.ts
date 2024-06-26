/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { findAll } from '../fn/like-controller/find-all';
import { FindAll$Params } from '../fn/like-controller/find-all';
import { findById } from '../fn/like-controller/find-by-id';
import { FindById$Params } from '../fn/like-controller/find-by-id';
import { findLikeByOnePost } from '../fn/like-controller/find-like-by-one-post';
import { FindLikeByOnePost$Params } from '../fn/like-controller/find-like-by-one-post';
import { findLikeByPost } from '../fn/like-controller/find-like-by-post';
import { FindLikeByPost$Params } from '../fn/like-controller/find-like-by-post';
import { LikeDto } from '../models/like-dto';
import { likeOrUnlikePost } from '../fn/like-controller/like-or-unlike-post';
import { LikeOrUnlikePost$Params } from '../fn/like-controller/like-or-unlike-post';

@Injectable({ providedIn: 'root' })
export class LikeControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `likeOrUnlikePost()` */
  static readonly LikeOrUnlikePostPath = '/api/v1/likes/{postId}/like';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `likeOrUnlikePost()` instead.
   *
   * This method doesn't expect any request body.
   */
  likeOrUnlikePost$Response(
    params: LikeOrUnlikePost$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<string>> {
    return likeOrUnlikePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `likeOrUnlikePost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  likeOrUnlikePost(
    params: LikeOrUnlikePost$Params,
    context?: HttpContext
  ): Observable<string> {
    return this.likeOrUnlikePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/api/v1/likes/{likeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(
    params: FindById$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<LikeDto>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(
    params: FindById$Params,
    context?: HttpContext
  ): Observable<LikeDto> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<LikeDto>): LikeDto => r.body)
    );
  }

  /** Path part for operation `findLikeByPost()` */
  static readonly FindLikeByPostPath = '/api/v1/likes/post/{postId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLikeByPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLikeByPost$Response(
    params: FindLikeByPost$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<LikeDto>>> {
    return findLikeByPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLikeByPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLikeByPost(
    params: FindLikeByPost$Params,
    context?: HttpContext
  ): Observable<Array<LikeDto>> {
    return this.findLikeByPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LikeDto>>): Array<LikeDto> => r.body)
    );
  }

  /** Path part for operation `findLikeByOnePost()` */
  static readonly FindLikeByOnePostPath = '/api/v1/likes/post/{postId}/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLikeByOnePost()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLikeByOnePost$Response(
    params: FindLikeByOnePost$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<{}>> {
    return findLikeByOnePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLikeByOnePost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLikeByOnePost(
    params: FindLikeByOnePost$Params,
    context?: HttpContext
  ): Observable<{}> {
    return this.findLikeByOnePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<{}>): {} => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/api/v1/likes/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(
    params?: FindAll$Params,
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<LikeDto>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(
    params?: FindAll$Params,
    context?: HttpContext
  ): Observable<Array<LikeDto>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LikeDto>>): Array<LikeDto> => r.body)
    );
  }
}
