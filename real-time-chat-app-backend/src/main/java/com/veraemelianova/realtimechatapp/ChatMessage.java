package com.veraemelianova.realtimechatapp;


import lombok.*;
import lombok.experimental.FieldDefaults;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;


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
    String timeStamp;
    String image;

    public void generateTimeStamp() {
        this.timeStamp = Instant.now().toString().split("T")[1].split("\\.")[0].substring(0, 8);
    }
}
