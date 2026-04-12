-- CreateTable
CREATE TABLE `empresas` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `razonSocial` VARCHAR(191) NULL,
    `ruc` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `empresas_ruc_key`(`ruc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` ENUM('ADMIN', 'TECNICO', 'VIEWER') NOT NULL DEFAULT 'TECNICO',
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `empresaId` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ultimoLogin` DATETIME(3) NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    INDEX `usuarios_empresaId_idx`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proyectos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'PLANIFICACION',
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `empresaId` VARCHAR(191) NOT NULL,

    INDEX `proyectos_empresaId_idx`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `olts` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NULL,
    `modelo` VARCHAR(191) NULL,
    `ipGestion` VARCHAR(191) NULL,
    `ubicacion` VARCHAR(191) NULL,
    `puertos` INTEGER NOT NULL DEFAULT 16,
    `latitud` DOUBLE NULL,
    `longitud` DOUBLE NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `proyectoId` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    INDEX `olts_proyectoId_idx`(`proyectoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postes` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `tipo` VARCHAR(191) NOT NULL DEFAULT 'CONCRETO',
    `altura` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `direccion` VARCHAR(191) NULL,
    `referencia` VARCHAR(191) NULL,

    UNIQUE INDEX `postes_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `troncales` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `bufferColor` VARCHAR(191) NOT NULL,
    `cantHilos` INTEGER NOT NULL DEFAULT 96,
    `hilosLibres` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `ruta` LONGTEXT NULL,
    `proyectoId` VARCHAR(191) NOT NULL,
    `oltId` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `troncales_nombre_key`(`nombre`),
    INDEX `troncales_proyectoId_idx`(`proyectoId`),
    INDEX `troncales_oltId_idx`(`oltId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hilos_fibra` (
    `id` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `troncalId` VARCHAR(191) NOT NULL,
    `estado` ENUM('LIBRE', 'RESERVADO', 'OCUPADO', 'AVERIADO', 'MANTENIMIENTO') NOT NULL DEFAULT 'LIBRE',
    `color` VARCHAR(191) NOT NULL,
    `bufferColor` VARCHAR(191) NOT NULL,
    `longitudTotal` DOUBLE NULL,
    `atenuacion` DOUBLE NULL,
    `observaciones` TEXT NULL,
    `mufaOrigenId` VARCHAR(191) NULL,
    `splitterEntradaId` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `hilos_fibra_splitterEntradaId_key`(`splitterEntradaId`),
    INDEX `hilos_fibra_troncalId_idx`(`troncalId`),
    INDEX `hilos_fibra_estado_idx`(`estado`),
    INDEX `hilos_fibra_mufaOrigenId_idx`(`mufaOrigenId`),
    UNIQUE INDEX `hilos_fibra_troncalId_numero_key`(`troncalId`, `numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hilo_historial` (
    `id` VARCHAR(191) NOT NULL,
    `hiloId` VARCHAR(191) NOT NULL,
    `accion` ENUM('CREAR', 'MODIFICAR', 'ELIMINAR', 'CONECTAR', 'DESCONECTAR', 'RESERVAR', 'LIBERAR', 'AVERIAR', 'REPARAR') NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `estadoAnterior` ENUM('LIBRE', 'RESERVADO', 'OCUPADO', 'AVERIADO', 'MANTENIMIENTO') NULL,
    `estadoNuevo` ENUM('LIBRE', 'RESERVADO', 'OCUPADO', 'AVERIADO', 'MANTENIMIENTO') NOT NULL,
    `detalle` VARCHAR(191) NULL,
    `ipAddress` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `hilo_historial_hiloId_idx`(`hiloId`),
    INDEX `hilo_historial_usuarioId_idx`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mufas` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `bufferEntrada` VARCHAR(191) NOT NULL,
    `hiloEntrada` INTEGER NOT NULL,
    `ratioSplitteo` VARCHAR(191) NOT NULL DEFAULT '1:16',
    `hilosDisponibles` INTEGER NOT NULL DEFAULT 16,
    `posteId` VARCHAR(191) NOT NULL,
    `troncalId` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `mufas_codigo_key`(`codigo`),
    UNIQUE INDEX `mufas_posteId_key`(`posteId`),
    INDEX `mufas_troncalId_idx`(`troncalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `splitters` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `tipo` ENUM('PLC', 'FBT') NOT NULL,
    `ratio` VARCHAR(191) NOT NULL,
    `entradaHiloId` VARCHAR(191) NULL,
    `mufaId` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `atenuacion` DOUBLE NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `splitters_codigo_key`(`codigo`),
    UNIQUE INDEX `splitters_entradaHiloId_key`(`entradaHiloId`),
    INDEX `splitters_mufaId_idx`(`mufaId`),
    INDEX `splitters_entradaHiloId_idx`(`entradaHiloId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `splitter_salidas` (
    `id` VARCHAR(191) NOT NULL,
    `splitterId` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `estado` ENUM('LIBRE', 'OCUPADO', 'RESERVADO', 'AVERIADO') NOT NULL DEFAULT 'LIBRE',
    `cajaId` VARCHAR(191) NULL,
    `fechaConexion` DATETIME(3) NULL,

    INDEX `splitter_salidas_cajaId_idx`(`cajaId`),
    UNIQUE INDEX `splitter_salidas_splitterId_numero_key`(`splitterId`, `numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cajas` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `colorHiloCaja` VARCHAR(191) NULL,
    `puertosLibres` INTEGER NOT NULL DEFAULT 16,
    `capacidadTotal` INTEGER NOT NULL DEFAULT 16,
    `posteId` VARCHAR(191) NOT NULL,
    `mufaId` VARCHAR(191) NULL,
    `hiloFibraId` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `cajas_codigo_key`(`codigo`),
    UNIQUE INDEX `cajas_posteId_key`(`posteId`),
    UNIQUE INDEX `cajas_hiloFibraId_key`(`hiloFibraId`),
    INDEX `cajas_mufaId_idx`(`mufaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tramo_cables` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NULL,
    `tipoCable` VARCHAR(191) NOT NULL,
    `path` LONGTEXT NOT NULL,
    `colorVisual` VARCHAR(191) NOT NULL DEFAULT '#8b5cf6',
    `proyectoId` VARCHAR(191) NOT NULL,
    `posteInicioId` VARCHAR(191) NULL,
    `posteFinId` VARCHAR(191) NULL,
    `mufaOrigenId` VARCHAR(191) NULL,
    `cajaDestinoId` VARCHAR(191) NULL,
    `longitudMetros` DOUBLE NULL,
    `atenuacion` DOUBLE NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tramo_cables_proyectoId_idx`(`proyectoId`),
    INDEX `tramo_cables_posteInicioId_idx`(`posteInicioId`),
    INDEX `tramo_cables_posteFinId_idx`(`posteFinId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `snMac` VARCHAR(191) NULL,
    `latitud` DOUBLE NULL,
    `longitud` DOUBLE NULL,
    `estadoServicio` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',
    `cajaId` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `clientes_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `circuitos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `longitudTotal` DOUBLE NULL,
    `atenuacionTotal` DOUBLE NULL,
    `estado` ENUM('ACTIVO', 'INACTIVO', 'AVERIADO', 'MANTENIMIENTO') NOT NULL DEFAULT 'ACTIVO',
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `circuitos_codigo_key`(`codigo`),
    UNIQUE INDEX `circuitos_clienteId_key`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `circuito_elementos` (
    `id` VARCHAR(191) NOT NULL,
    `circuitoId` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL,
    `tipo` ENUM('OLT', 'TRONCAL', 'HILO', 'MUFA', 'SPLITTER_ENTRADA', 'SPLITTER_SALIDA', 'CAJA', 'DROP_CABLE') NOT NULL,
    `troncalId` VARCHAR(191) NULL,
    `hiloId` VARCHAR(191) NULL,
    `splitterId` VARCHAR(191) NULL,
    `splitterSalidaId` VARCHAR(191) NULL,
    `cajaId` VARCHAR(191) NULL,
    `mufaId` VARCHAR(191) NULL,
    `conexion` VARCHAR(191) NULL,
    `atenuacion` DOUBLE NULL,
    `longitud` DOUBLE NULL,

    INDEX `circuito_elementos_circuitoId_idx`(`circuitoId`),
    INDEX `circuito_elementos_orden_idx`(`orden`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `circuito_historial` (
    `id` VARCHAR(191) NOT NULL,
    `circuitoId` VARCHAR(191) NOT NULL,
    `accion` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `detalle` VARCHAR(191) NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `averias` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `tipo` ENUM('CORTE_FIBRA', 'ATENUACION_ALTA', 'CONEXION_DEFECTUOSA', 'EQUIPO_DAÑADO', 'POSTE_CAIDO', 'ROBO_VANDALISMO', 'OTRO') NOT NULL,
    `descripcion` TEXT NOT NULL,
    `latitud` DOUBLE NULL,
    `longitud` DOUBLE NULL,
    `troncalId` VARCHAR(191) NULL,
    `hiloId` VARCHAR(191) NULL,
    `mufaId` VARCHAR(191) NULL,
    `cajaId` VARCHAR(191) NULL,
    `clienteId` VARCHAR(191) NULL,
    `estado` ENUM('REPORTADA', 'ASIGNADA', 'EN_REPARACION', 'RESUELTA', 'CANCELADA') NOT NULL DEFAULT 'REPORTADA',
    `prioridad` ENUM('BAJA', 'MEDIA', 'ALTA', 'CRITICA') NOT NULL DEFAULT 'MEDIA',
    `tecnicoId` VARCHAR(191) NULL,
    `reportadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resueltoEn` DATETIME(3) NULL,
    `empresaId` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `averias_codigo_key`(`codigo`),
    INDEX `averias_empresaId_idx`(`empresaId`),
    INDEX `averias_estado_idx`(`estado`),
    INDEX `averias_prioridad_idx`(`prioridad`),
    INDEX `averias_tecnicoId_idx`(`tecnicoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `averia_notas` (
    `id` VARCHAR(191) NOT NULL,
    `averiaId` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `contenido` TEXT NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `averia_notas_averiaId_idx`(`averiaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventario_items` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('SPLITTER', 'CAJA_NAP', 'CONECTOR', 'FIBRA_DROP', 'POSTE', 'ANCLAJE', 'HERRAMIENTA', 'OLT_EQUIPAMENT', 'OTRO') NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `stockTotal` INTEGER NOT NULL DEFAULT 0,
    `stockMinimo` INTEGER NOT NULL DEFAULT 5,
    `stockReservado` INTEGER NOT NULL DEFAULT 0,
    `ubicacion` VARCHAR(191) NULL,
    `almacen` VARCHAR(191) NULL,
    `proveedor` VARCHAR(191) NULL,
    `costoUnitario` DOUBLE NULL,
    `moneda` VARCHAR(191) NOT NULL DEFAULT 'PEN',
    `empresaId` VARCHAR(191) NOT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `inventario_items_codigo_key`(`codigo`),
    INDEX `inventario_items_empresaId_idx`(`empresaId`),
    INDEX `inventario_items_tipo_idx`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventario_asignaciones` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `tipoDestino` ENUM('POSTE', 'MUFA', 'CAJA', 'PROYECTO', 'OLT') NOT NULL,
    `destinoId` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fechaInstalacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `instaladoPor` VARCHAR(191) NULL,
    `serialNumber` VARCHAR(191) NULL,

    INDEX `inventario_asignaciones_itemId_idx`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proyectos` ADD CONSTRAINT `proyectos_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `olts` ADD CONSTRAINT `olts_proyectoId_fkey` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `troncales` ADD CONSTRAINT `troncales_proyectoId_fkey` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `troncales` ADD CONSTRAINT `troncales_oltId_fkey` FOREIGN KEY (`oltId`) REFERENCES `olts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hilos_fibra` ADD CONSTRAINT `hilos_fibra_troncalId_fkey` FOREIGN KEY (`troncalId`) REFERENCES `troncales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hilos_fibra` ADD CONSTRAINT `hilos_fibra_mufaOrigenId_fkey` FOREIGN KEY (`mufaOrigenId`) REFERENCES `mufas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hilo_historial` ADD CONSTRAINT `hilo_historial_hiloId_fkey` FOREIGN KEY (`hiloId`) REFERENCES `hilos_fibra`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hilo_historial` ADD CONSTRAINT `hilo_historial_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mufas` ADD CONSTRAINT `mufas_posteId_fkey` FOREIGN KEY (`posteId`) REFERENCES `postes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mufas` ADD CONSTRAINT `mufas_troncalId_fkey` FOREIGN KEY (`troncalId`) REFERENCES `troncales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `splitters` ADD CONSTRAINT `splitters_entradaHiloId_fkey` FOREIGN KEY (`entradaHiloId`) REFERENCES `hilos_fibra`(`splitterEntradaId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `splitters` ADD CONSTRAINT `splitters_mufaId_fkey` FOREIGN KEY (`mufaId`) REFERENCES `mufas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `splitter_salidas` ADD CONSTRAINT `splitter_salidas_splitterId_fkey` FOREIGN KEY (`splitterId`) REFERENCES `splitters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `splitter_salidas` ADD CONSTRAINT `splitter_salidas_cajaId_fkey` FOREIGN KEY (`cajaId`) REFERENCES `cajas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cajas` ADD CONSTRAINT `cajas_posteId_fkey` FOREIGN KEY (`posteId`) REFERENCES `postes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cajas` ADD CONSTRAINT `cajas_mufaId_fkey` FOREIGN KEY (`mufaId`) REFERENCES `mufas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cajas` ADD CONSTRAINT `cajas_hiloFibraId_fkey` FOREIGN KEY (`hiloFibraId`) REFERENCES `hilos_fibra`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tramo_cables` ADD CONSTRAINT `tramo_cables_proyectoId_fkey` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tramo_cables` ADD CONSTRAINT `tramo_cables_posteInicioId_fkey` FOREIGN KEY (`posteInicioId`) REFERENCES `postes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tramo_cables` ADD CONSTRAINT `tramo_cables_posteFinId_fkey` FOREIGN KEY (`posteFinId`) REFERENCES `postes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tramo_cables` ADD CONSTRAINT `tramo_cables_mufaOrigenId_fkey` FOREIGN KEY (`mufaOrigenId`) REFERENCES `mufas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tramo_cables` ADD CONSTRAINT `tramo_cables_cajaDestinoId_fkey` FOREIGN KEY (`cajaDestinoId`) REFERENCES `cajas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_cajaId_fkey` FOREIGN KEY (`cajaId`) REFERENCES `cajas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `circuitos` ADD CONSTRAINT `circuitos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `circuito_elementos` ADD CONSTRAINT `circuito_elementos_circuitoId_fkey` FOREIGN KEY (`circuitoId`) REFERENCES `circuitos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `circuito_elementos` ADD CONSTRAINT `circuito_elementos_hiloId_fkey` FOREIGN KEY (`hiloId`) REFERENCES `hilos_fibra`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `circuito_historial` ADD CONSTRAINT `circuito_historial_circuitoId_fkey` FOREIGN KEY (`circuitoId`) REFERENCES `circuitos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `circuito_historial` ADD CONSTRAINT `circuito_historial_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `averias` ADD CONSTRAINT `averias_tecnicoId_fkey` FOREIGN KEY (`tecnicoId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `averias` ADD CONSTRAINT `averias_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `averia_notas` ADD CONSTRAINT `averia_notas_averiaId_fkey` FOREIGN KEY (`averiaId`) REFERENCES `averias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `averia_notas` ADD CONSTRAINT `averia_notas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventario_items` ADD CONSTRAINT `inventario_items_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventario_asignaciones` ADD CONSTRAINT `inventario_asignaciones_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `inventario_items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

