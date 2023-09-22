import { isEmpty } from "lodash"

export function isPostUrl(path: string): boolean {
    return !isEmpty(path.match(/https:\/\/www\.facebook\.com\/[^\/]+\/posts\/\d+/))
}

export function isPostGroupUrl(path: string): boolean {
    return !isEmpty(path.match(/https:\/\/www\.facebook\.com\/groups\/[^\/]+\/permalink\/\d+/))
}