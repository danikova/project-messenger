import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const historyPush = (path, state) => {
    const { location } = window;
    if (location.href !== `${location.origin}${path}`)
        history.push(path, state);
};
