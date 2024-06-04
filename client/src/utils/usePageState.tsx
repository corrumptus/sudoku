import { useLocation, useParams } from "react-router-dom";

export enum PageType {
  NOT_LOGGED_PAGE,
  NON_USER_PAGE,
  USER_PAGE,
  SELF_USER_PAGE
}

export default function usePageType(): PageType {
  const userName = localStorage.getItem("sudoku-name");

  if (userName === null)
    return PageType.NOT_LOGGED_PAGE;

  const location = useLocation();

  if (!location.pathname.includes("/user"))
    return PageType.NON_USER_PAGE;

  const { name } = useParams();

  if (name !== userName)
    return PageType.USER_PAGE;

  return PageType.SELF_USER_PAGE;
}