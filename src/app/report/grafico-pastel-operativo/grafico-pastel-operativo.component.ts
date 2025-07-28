import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ControlOperativoService } from '../../administration/services/control_operativo.service';
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
  selector: 'app-grafico-pastel-operativo',
  standalone: true,
  imports: [
    BaseChartDirective,
    NgFor,
    NgIf,
    FormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './grafico-pastel-operativo.component.html',
})
export class GraficoPastelOperativoComponent implements OnInit {
  private operativoService = inject(ControlOperativoService);

  public pieChartType: 'pie' = 'pie';
  datosDisponibles: any[] = [];
  lugarSeleccionado: string = '';
  tipoSeleccionado: string = '';

  filtroTipo: string = '';
  filtroLugar: string = '';

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  lugares: string[] = [];
  tipos: string[] = ['Operativos de Intervencion', 'Puestos de Control'];

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
        text: 'Seleccione lugar y tipo',
        font: { size: 22, weight: 'bold' },
        color: '#FFFFFF',
        padding: { bottom: 20 }
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
    this.operativoService.getControlOperativoPastel().subscribe((data) => {
      const lugaresUnicos = [...new Set(data.map(d => d.lugar))];
      this.lugares = lugaresUnicos.filter((lugar): lugar is string => typeof lugar === 'string' && lugar.trim() !== '');
    });
  }

  onTipoSeleccionado(tipo: string): void {
    this.tipoSeleccionado = tipo;
    this.intentarActualizarGrafico();
  }

  private intentarActualizarGrafico(): void {
    if (!this.lugarSeleccionado || !this.tipoSeleccionado) {
      this.chartData = { labels: [], datasets: [] };
      this.chartOptions.plugins!.title!.text = 'Seleccione lugar y tipo';
      if (this.chart) this.chart.update();
      return;
    }

    this.operativoService.getControlOperativoPastel({ lugar: this.lugarSeleccionado, tipo: this.tipoSeleccionado }).subscribe((data) => {
      console.log('Datos recibidos:', data);
      if (!data.length) {
        this.chartData = { labels: [], datasets: [] };
        this.chartOptions.plugins!.title!.text = 'No hay datos disponibles para la selección';
        if (this.chart) this.chart.update();
        return;
      }

      const totalUso = data.reduce((acc, d) => acc + (d.efectivo_uso ?? 0), 0);
      const totalEfectivo = data.reduce((acc, d) => acc + (d.efectivo_total ?? 0), 0);
      const disponible = totalEfectivo - totalUso;

      this.chartData = {
        labels: [
          //(${this.tipoSeleccionado}) mostrar el tipo
          `Efectivos desplegados`, 
          `Efectivos disponibles`
        ],
        datasets: [
          {
            data: [totalUso, disponible],
            backgroundColor: ['#EF4444', '#10B981'],
          }
        ]
      };

      this.chartOptions.plugins!.title!.text = `${this.tipoSeleccionado} en ${this.lugarSeleccionado} - Efectivo Total: ${totalEfectivo}`;

      setTimeout(() => {
        if (this.chart) this.chart.update();
      }, 0);
    });
  }

  onLugarSeleccionado(lugar: string): void {
    this.lugarSeleccionado = lugar;
    this.tipoSeleccionado = ''; // Reinicia el tipo
    this.chartData = { labels: [], datasets: [] }; // Limpia el gráfico
    this.chartOptions.plugins!.title!.text = 'Seleccione lugar y tipo';
    if (this.chart) this.chart.update();
  }

  get tiposFiltrados(): string[] {
    return this.tipos.filter(t => t.toLowerCase().includes(this.filtroTipo.toLowerCase()));
  }
  onTipoOpened(opened: boolean) {
    if (!opened) this.filtroTipo = '';
  }
  get lugaresFiltrados(): string[] {
    return this.lugares.filter(l =>
      l.toLowerCase().includes(this.filtroLugar.toLowerCase())
    );
  }
  onLugarOpened(opened: boolean) {
    if (!opened) this.filtroLugar = '';
  }

}
