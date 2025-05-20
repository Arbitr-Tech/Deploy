package com.arbitr.cargoway.mapper;

import com.arbitr.cargoway.dto.rs.FileRs;
import com.arbitr.cargoway.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ImageMapper {
    @Mapping(source = "imagePath", target = "path")
    FileRs toRsDto(Image image);
}
