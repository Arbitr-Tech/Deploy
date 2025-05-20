package com.arbitr.cargoway.service;

import com.arbitr.cargoway.dto.rs.FileRs;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public interface ImageService {
    /**
     * Метод для сохранения файла в хранилище
     * @param inputStream - файл
     * @param fileSize - размер файла
     * @param fileName - имя файла
     */
    FileRs saveImage(InputStream inputStream, Long fileSize, String fileName, String contentType) ;
}
