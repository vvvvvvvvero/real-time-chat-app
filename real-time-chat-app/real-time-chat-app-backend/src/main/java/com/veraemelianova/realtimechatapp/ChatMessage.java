package com.veraemelianova.realtimechatapp;


import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ChatMessage {

    String sender;
    String content;
    MessageType type;
    String image;
}
