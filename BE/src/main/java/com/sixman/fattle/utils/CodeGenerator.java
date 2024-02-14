package com.sixman.fattle.utils;

import java.util.Random;

public class CodeGenerator {

    private static final int LEFT_LIMIT = 65;

    private static final int RIGHT_LIMIT = 90;

    private static final int TARGET_STRING_LENGTH = 6;

    private static final Random random = new Random();

    public static String createBattleCode() {
        StringBuilder buffer = new StringBuilder(TARGET_STRING_LENGTH);

        for (int i = 0; i < TARGET_STRING_LENGTH; i++) {
            int randomLimitedInt = LEFT_LIMIT
                    + (int) (random.nextFloat() * (RIGHT_LIMIT - LEFT_LIMIT + 1));
            buffer.append((char) randomLimitedInt);
        }

        return buffer.toString();
    }

}
