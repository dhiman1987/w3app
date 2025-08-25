package com.dhiman.w3app.util;

import com.dhiman.w3app.dto.YearDTO;

/*public final class YearMapper {

    private YearMapper() {}

    public static YearDTO toDTO(long yearValue) {
        if (yearValue == 0) {
            throw new IllegalArgumentException("Year 0 does not exist in BCE/CE dating");
        }
        String era = yearValue < 0 ? "BCE" : "CE";
        long absYear = Math.abs(yearValue);
        String display = absYear + " " + era;
        return new YearDTO(yearValue, era, display);
    }

    public static long toValue(YearDTO dto) {
        if (dto.value() == 0) {
            throw new IllegalArgumentException("Year 0 does not exist in BCE/CE dating");
        }
        return dto.era().equalsIgnoreCase("BCE") ? -Math.abs(dto.value()) : Math.abs(dto.value());
    }
}*/

public final class YearMapper {

    private YearMapper() {}

    public static YearDTO toDTO(long yearValue) {
        if (yearValue == 0) {
            throw new IllegalArgumentException("Year 0 does not exist in BCE/CE/MYA dating");
        }

        String era;
        long absYear;

        if (yearValue < 0 && Math.abs(yearValue) > 1_000_000) {
            // Treat as MYA if it's a large negative number (in raw years)
            era = "MYA";
            absYear = Math.abs(yearValue) / 1_000_000; // convert to millions
        } else if (yearValue < 0) {
            era = "BCE";
            absYear = Math.abs(yearValue);
        } else {
            era = "CE";
            absYear = yearValue;
        }

        String display = absYear + " " + era;
        return new YearDTO(absYear, era, display);
    }

    public static long toValue(YearDTO dto) {
        if (dto.value() == 0) {
            throw new IllegalArgumentException("Year 0 does not exist in BCE/CE/MYA dating");
        }

        String era = dto.era().toUpperCase();

        return switch (era) {
            case "BCE" -> -Math.abs(dto.value());
            case "CE" -> Math.abs(dto.value());
            case "MYA" ->
                // Store MYA as large negative number in raw years
                    -Math.abs(dto.value()) * 1_000_000;
            default -> throw new IllegalArgumentException("Unknown era: " + dto.era());
        };
    }
}


