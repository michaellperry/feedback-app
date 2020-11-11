import * as React from "react";

interface UserAvatarProps {
  name: string;
}

export const UserAvatar = ({ name }: UserAvatarProps) => (
  <div className="jinaga-feedback-user-avatar">
    <img src="http://qedcode.com/sites/default/files/Avatar_Small.jpg" />
    <p>{name}</p>
  </div>
)