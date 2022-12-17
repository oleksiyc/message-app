import moment from "moment";

export function sortDateByNewest({messages}:{messages:any}){
    return messages.sort((a:any, b:any) => moment(a.last_updated, 'YYYY-MM-DD').diff(moment(b.last_updated, 'YYYY-MM-DD'))).reverse();
}

export function sortDateByOldest({messages}:{messages:any}){
    return messages.sort((a:any, b:any) => moment(a.last_updated, 'YYYY-MM-DD').diff(moment(b.last_updated, 'YYYY-MM-DD')));
}

export function formatDate({date}:{date:any}){
    return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
}