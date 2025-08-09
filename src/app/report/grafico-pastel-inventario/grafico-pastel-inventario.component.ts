import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { InventarioService } from '../../administration/services/inventario.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController,
  ChartOptions,
  ChartData
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

Chart.register(PieController, ArcElement, Tooltip, Legend, Title, ChartDataLabels);

@Component({
  selector: 'app-grafico-pastel',
  standalone: true,
  imports: [
    BaseChartDirective,
    NgFor,
    NgIf,
    FormsModule,
    MatFormField,
    MatLabel,MatSelect,
    MatOption
  ],
  templateUrl: './grafico-pastel-inventario.component.html',
})
export class GraficoPastelComponent implements OnInit {
  private inventarioService = inject(InventarioService);

  public pieChartType: 'pie' = 'pie';
  equiposDisponibles: any[] = [];
  equipoSeleccionado: any = null;
  tiposDisponibles: string[] = ['Herramientas', 'Equipo', 'Transporte','No-Tripulados','Sanidad','Combustible'];
  tipoSeleccionado: string = '';

  equipoFiltro: string = '';
  filtroTipo: string = '';
  
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [],
  };

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF',
          font: { size: 12 }
        }
      },
      title: {
        display: true,
        text: 'Seleccione los datos',
        font: { size: 22, weight: 'bold' },
        color: '#FFFFFF',
        padding: {  bottom: 20 }
      },
      datalabels: {
        color: '#FFFFFF',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value: number, context) => {
          const label = context.chart.data.labels?.[context.dataIndex] ?? '';
          return `${value} ${label}`;
        }
      }
    }
  };


  ngOnInit(): void {
    this.inventarioService.getInventarioPastel('equipo').subscribe((data: any[]) => {
      this.equiposDisponibles = data;
    });
  }

  onEquipoSeleccionado(nombre: string): void {
    const equipo = this.equiposDisponibles.find(e => e.nombre === nombre);
    if (!equipo) return;

    const disponible = equipo.cantidad_total - equipo.cantidad_uso;

    this.chartData = {
      labels: [
        `(${equipo.nombre}) En uso`,
        `(${equipo.nombre}) Disponibles`
      ],
      datasets: [
        {
          data: [equipo.cantidad_uso, disponible],
          backgroundColor: ['#EF4444', '#10B981'],
        }
      ]
    };
    this.chartOptions.plugins!.title!.text = `${equipo.nombre} - Total: ${equipo.cantidad_total}`;

    setTimeout(() => {
      this.chart.update();
    }, 0);
  }

  onTipoSeleccionado(tipo: string): void {
    this.tipoSeleccionado = tipo;
    this.equipoSeleccionado = ''; // limpiar select de ítems
    this.chartData = { labels: [], datasets: [] }; // limpiar gráfico
    this.chartOptions.plugins!.title!.text = 'Seleccione un ítem';

    this.inventarioService.getInventarioPastel(tipo).subscribe((data: any[]) => {
      this.equiposDisponibles = data;
    });
  }

  get equiposFiltrados() {
    if (!this.equipoFiltro) return this.equiposDisponibles;
    return this.equiposDisponibles.filter(e =>
      e.nombre.toLowerCase().includes(this.equipoFiltro.toLowerCase())
    );
  }
  onEquipoOpened(opened: boolean) {
    if (!opened) this.equipoFiltro = '';
  }
  get tiposFiltrados() {
    if (!this.filtroTipo) return this.tiposDisponibles;
    return this.tiposDisponibles.filter(t =>
      t.toLowerCase().includes(this.filtroTipo.toLowerCase())
    );
  }

  onTipoOpened(opened: boolean) {
    if (!opened) this.filtroTipo = '';
  }

}
