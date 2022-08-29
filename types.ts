import { ParsedUrlQuery } from "querystring"

export interface GetData {
    data:    Data;
    headers: Headers;
}

export interface Data {
    stories: Story[];
    cv:      number;
    rels:    any[];
    links:   any[];
}

export interface Story {
    name:               string;
    created_at:         Date;
    published_at:       Date;
    id:                 number;
    uuid:               string;
    content:            Content;
    slug:               string;
    full_slug:          string;
    sort_by_date:       null;
    position:           number;
    tag_list:           any[];
    is_startpage:       boolean;
    parent_id:          number | null;
    meta_data:          null;
    group_id:           string;
    first_published_at: Date;
    release_id:         null;
    lang:               string;
    path:               null | string;
    alternates:         any[];
    default_full_slug:  null;
    translated_slugs:   null;
}

export interface Content {
    _uid:      string;
    question:  Question[];
    component: string;
}

export interface Question {
    _uid:      string;
    options:   Option[];
    question:  string;
    component: string;
    answer?: string
    points?: number
}

export interface Option {
    _uid:         string;
    component:    Component;
    option_value: string;
    right_answer: boolean;
}

export enum Component {
    Option = "option",
}

export interface Headers {
    "content-type":                      string;
    "content-length":                    string;
    connection:                          string;
    date:                                string;
    server:                              string;
    "x-frame-options":                   string;
    "x-xss-protection":                  string;
    "x-content-type-options":            string;
    "x-download-options":                string;
    "x-permitted-cross-domain-policies": string;
    "referrer-policy":                   string;
    "cache-control":                     string;
    total:                               string;
    "per-page":                          string;
    etag:                                string;
    "x-request-id":                      string;
    "x-runtime":                         string;
    vary:                                string;
    "x-cache":                           string;
    via:                                 string;
    "x-amz-cf-pop":                      string;
    "x-amz-cf-id":                       string;
}

export interface Params extends ParsedUrlQuery {
    slug: string
  }

export interface globalContextType {
    name: string
    setUserName: (name: string) => void
    id: string
    setUserId: (id: string) => void
    questions: Question[]
    setQuizQuestions: (questions: Question[]) => void
  }

  export interface Results {
    name:   string;
    points: number;
    id:     string;
    correctAnswers: number;
  }